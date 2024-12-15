// rafce

import { fetchLandmarks } from "@/actions/actions";
import { SignInCardButton } from "@/components/form/Buttons";
import EmptyList from "@/components/home/EmptyList";
import LandmarkList from "@/components/home/LandmarkList";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

const CampPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) => {
  // Search
  const { search } = await searchParams;

  const { userId } = await auth();
  if (!userId) return <SignInCardButton />;
  const favorites = await fetchLandmarks({ profileId: userId, search: search });
  if (favorites.length === 0) {
    return <EmptyList heading="You don't have" />;
  }

  return (
    <>
      <header className="flex gap-6">
        <h1 className="text-2xl font-bold">My Camp</h1>
        <Link href="camp/create">
          <Button>สร้าง</Button>
        </Link>
      </header>

      <LandmarkList landmarks={favorites} />
    </>
  );
};
export default CampPage;
