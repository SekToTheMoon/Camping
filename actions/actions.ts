"use server";

import {
  imageSchema,
  landmarkSchema,
  profileSchema,
  validateWithZod,
} from "@/utils/schemas";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import db from "@/utils/db";
import { redirect } from "next/navigation";
import { deleteFile, uploadFile } from "@/utils/supabase";
import { revalidatePath } from "next/cache";

const getAuthUser = async () => {
  // code body
  const user = await currentUser();
  if (!user) {
    throw new Error("You must logged!!!");
  }
  if (!user.privateMetadata.hasProfile) redirect("/profile/create");
  return user;
};

const renderError = (error: unknown): { message: string } => {
  //code body
  return {
    message: error instanceof Error ? error.message : "An Error!!!",
  };
};

export const fetchHasProfile = async (userId: string) => {
  const user = db.profile.findFirst({
    where: { clerkId: userId },
  });

  return user;
};

export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Please Login!!!");

    const rawData = Object.fromEntries(formData);
    const validateField = validateWithZod(profileSchema, rawData);
    // console.log("validated", validateField);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        ...validateField,
      },
    });
    const client = await clerkClient();
    await client.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
    // return { message: "Create Profile Success!!!" };
  } catch (error) {
    // console.log(error);
    return renderError(error);
  }
  redirect("/");
};

export const editProfileAction = async (prevState: any, formData: FormData) => {
  try {
    const rawData = Object.fromEntries(formData);
    const validateField = validateWithZod(profileSchema, rawData);

    await db.profile.update({
      data: {
        ...validateField,
      },
      where: {
        id: rawData.id as string,
      },
    });
    // return { message: "Update Profile Success!!!" };
  } catch (error) {
    // console.log(error);
    return renderError(error);
  }
  redirect("/");
};

export const createLandmarkAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const user = await getAuthUser();
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;

    // Step 1 Validate Data
    const validatedFile = validateWithZod(imageSchema, { image: file });
    const validateField = validateWithZod(landmarkSchema, rawData);

    // Step 2 Upload Image to Supabase
    const fullPath = await uploadFile(validatedFile.image);
    // console.log(fullPath);
    // Step 3 Insert to DB
    await db.landmark.create({
      data: {
        ...validateField,
        image: fullPath,
        profileId: user.id,
      },
    });
    // return { message: "Create Landmark Success!!!" };
  } catch (error) {
    // console.log(error);
    return renderError(error);
  }
  redirect("/");
};

export const editLandmark = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const rawData = Object.fromEntries(formData);
  try {
    // Step 1 Validate Data
    // Step 2 Upload Image to Supabase and check exist
    // Step 3 Insert to DB
    const user = await getAuthUser();
    const rawData = Object.fromEntries(formData);
    const validateField = validateWithZod(landmarkSchema, rawData);
    const file = formData.get("image") as File;
    const hasFile = file.size > 0;
    const fullPath = hasFile
      ? await uploadFile(validateWithZod(imageSchema, { image: file }).image)
      : null;

    if (fullPath) {
      const imageName = await db.landmark.findFirst({
        where: {
          id: rawData.id as string,
        },
        select: {
          image: true,
        },
      });
      if (imageName?.image) {
        await deleteFile(imageName.image);
      }
    }

    await db.landmark.update({
      data: {
        ...validateField,
        ...(fullPath && { image: fullPath }),
        profileId: user.id,
      },
      where: {
        id: rawData.id as string,
      },
    });
  } catch (error) {
    // console.log(error);
    return renderError(error);
  }
  redirect("/landmark/" + rawData.id);
};

export const fetchLandmarks = async ({
  search = "",
  category,
  profileId,
}: {
  search?: string;
  category?: string;
  profileId?: string;
}) => {
  const landmarks = await db.landmark.findMany({
    where: {
      category,
      profileId,
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return landmarks;
};

export const fetchLandmarksHero = async () => {
  const landmarks = await db.landmark.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
  return landmarks;
};

export const fetchFavoriteId = async ({
  landmarkId,
}: {
  landmarkId: string;
}) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: {
      landmarkId: landmarkId,
      profileId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  favoriteId: string | null;
  landmarkId: string;
  pathname: string;
}) => {
  const { favoriteId, landmarkId, pathname } = prevState;
  const user = await getAuthUser();
  try {
    // Delete
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      // Create
      await db.favorite.create({
        data: {
          landmarkId: landmarkId,
          profileId: user.id,
        },
      });
    }
    revalidatePath(pathname);
    return {
      message: favoriteId ? "Removed Favorite Success" : "Add Favorite Success",
    };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavorits = async () => {
  const user = await getAuthUser();
  const favorites = await db.favorite.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      landmark: {
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          price: true,
          province: true,
          lat: true,
          lng: true,
          category: true,
        },
      },
    },
  });
  return favorites.map((favorite) => favorite.landmark);
};

export const fetchLandmarkDetail = async ({ id }: { id: string }) => {
  // code body
  return db.landmark.findFirst({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });
};
