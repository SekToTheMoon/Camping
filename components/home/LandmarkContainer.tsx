import { fetchLandmarks, fetchLandmarksHero } from "@/actions/actions";
import LandmarkList from "./LandmarkList";
import { LandmarkCardProps } from "@/utils/types";
import Hero from "../hero/Hero";
import CategoriesList from "./CategoriesList";
import EmptyList from "./EmptyList";
import { Suspense } from "react";
import { SkeletonCardList } from "../card/LoadingCard";

const LandmarkContainer = async ({
  search,
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const landmarks: LandmarkCardProps[] = await fetchLandmarks({
    search,
    category,
  });
  const landmarksHero: LandmarkCardProps[] = await fetchLandmarksHero();

  return (
    <div>
      <Hero landmarks={landmarksHero} />
      <CategoriesList search={search} category={category} />

      {landmarks.length === 0 ? (
        <EmptyList heading="No results" btnText="Clear Filters" />
      ) : (
        <Suspense fallback={<SkeletonCardList />}>
          <LandmarkList landmarks={landmarks} />{" "}
        </Suspense>
      )}
    </div>
  );
};
export default LandmarkContainer;
