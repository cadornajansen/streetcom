"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/utils/actions/get-a-product";
import { addItem } from "@/utils/actions/cart-management";
import { type Product } from "@/utils/actions/cart-management";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export default function Page({ params }: { params: { id: string } }) {
  const queryClient = useQueryClient();
  const productId = Number(params.id); // Convert id to number if necessary
  const { toast } = useToast();

  const {
    data: product,
    error,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const addToCartMutation = useMutation({
    mutationFn: (product: Product) => addItem(product.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_cart"] });
    },
  });

  if (isLoading) {
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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="mt-20 flex gap-14">
      <div>
        <Image
          width={300}
          height={550}
          alt={product.name}
          src={product.image}
        />
      </div>
      <div className="py-10 space-y-2">
        <h1 className="text-xl font-bold">{product.name}</h1>
        <p className="max-w-prose">{product.description}</p>
        <div>
          <Button
            className="mt-3 flex gap-2 items-center"
            onClick={() => {
              toast({
                title: "Cart Updated!",
                description: `✅ Added ${product.name} to cart`,
              });
              addToCartMutation.mutate(product);
            }}
          >
            <Image
              className="invert"
              height={20}
              width={20}
              alt="add-to-cart"
              src="/cart.svg"
            />
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
