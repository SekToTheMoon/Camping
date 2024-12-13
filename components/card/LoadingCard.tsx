// rafce
import { Skeleton } from "../ui/skeleton";
const LoadingCard = () => {
  return (
    <>
      <div>
        <Skeleton className="w-full h-[300px] rounded-md mb-4" />
        <Skeleton className="h-16 w-full rounded-md mb-5" />
      </div>
      <SkeletonCardList />
    </>
  );
};

export const SkeletonCard = () => {
  return (
    <div>
      <Skeleton className="h-[300px] rounded-md mb-2" />
      <Skeleton className="h-4 w-3/4 rounded-md mb-2" />
      <Skeleton className="h-4 w-1/2 rounded-md mb-2" />
      <Skeleton className="h-4 w-1/4 rounded-md" />
    </div>
  );
};

export const SkeletonCardList = () => {
  return (
    <div
      className="grid sm:grid-cols-2 
  lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4"
    >
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
};

export default LoadingCard;
