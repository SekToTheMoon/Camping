import { createClient } from "@supabase/supabase-js";

const bucket = "camping-image";
const url = process.env.SUPABASE_URL as string;
const key = process.env.SUPABASE_KEY as string;
const storeUrl =
  "https://gdgydvousbaelarkzque.supabase.co/storage/v1/object/public/camping-image/";

// Create Supabase client
const supabase = createClient(url, key);

// Upload file using standard upload
export async function uploadFile(image: File) {
  const timeStamp = Date.now();
  const newName = `camping-${timeStamp}-${image.name}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(newName, image, {
      cacheControl: "3600",
    });

  if (!data) throw new Error("Image upload failed!!!");
  //   const { data } = supabase.storage.from('bucket').getPublicUrl('filePath.jpg')
  // console.log(data.publicUrl)
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
}

export async function deleteFile(imageUrl: string) {
  const imageName = imageUrl.replace(storeUrl, "");
  const { error } = await supabase.storage.from(bucket).remove([imageName]);
  if (error) throw new Error("Image upload failed!!!");
}
