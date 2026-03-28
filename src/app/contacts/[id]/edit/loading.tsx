import { Skeleton } from '@next-template/ui/components/ui/skeleton';

const SkeletonField = () => (
  <div className="space-y-2">
    <Skeleton className="h-4 w-20" />
    <Skeleton className="h-9 w-full" />
  </div>
);

const EditContactLoading = () => {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 space-y-6">
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-8 w-48" />
      <div className="grid gap-4 sm:grid-cols-2">
        <SkeletonField />
        <SkeletonField />
        <SkeletonField />
        <SkeletonField />
        <SkeletonField />
        <SkeletonField />
        <SkeletonField />
      </div>
    </div>
  );
};

export default EditContactLoading;
