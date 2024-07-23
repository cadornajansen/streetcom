import { Skeleton } from "@/components/ui/skeleton";

export default async function Page({ params }: { params: { id: number } }) {
  return (
    <div className="mt-20 flex gap-14">
      <div className="">
        <Skeleton className="h-[350px] w-[300px] rounded-xl" />
      </div>
      <div className="py-10 space-y-2">
        <Skeleton className="mb-4 h-5 w-28" />
        <Skeleton className="h-4 w-[500px]" />
        <Skeleton className="h-4 w-[650px]" />
        <Skeleton className="h-4 w-[650px]" />
        <Skeleton className="h-4 w-[650px]" />
        <Skeleton className="h-4 w-[650px]" />
        <Skeleton className="h-4 w-[650px]" />
        <div className="pt-6">
          <Skeleton className="h-10 w-36" />
        </div>
      </div>
    </div>
  );
}
