import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";

import Products from "@/components/Products";
import { getAllProducts } from "@/utils/actions/get-all-products";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: () => {
      return getAllProducts();
    },
  });

  return (
    <main className="w-full h-full flex">
      <section className="w-full grid grid-cols-4 gap-9 my-10">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Products />
        </HydrationBoundary>
      </section>
    </main>
  );
}
