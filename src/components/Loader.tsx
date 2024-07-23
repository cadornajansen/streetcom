import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const skeletonLoaders = Array.from({ length: 8 }).map((_, index) => (
    <Card key={index} className="group product relative bg-transparent">
      <CardContent className="flex justify-center items-center pb-2 pt-3 max-h-52 py-4 px-6">
        <Skeleton className="h-[190px] w-[170px] rounded-xl" />
      </CardContent>
      <CardFooter className="pb-4 flex flex-col justify-center gap-y-2">
        <p className="font-medium">
          <Skeleton className="h-4 w-40" />
        </p>
        <span className="font-bold text-sm text-foreground/70">
          <Skeleton className="h-4 w-20" />
        </span>
      </CardFooter>
    </Card>
  ));

  return (
    <section className="w-full grid grid-cols-4 gap-9 my-10">
      {skeletonLoaders}
    </section>
  );
}
