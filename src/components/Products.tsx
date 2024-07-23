"use client";

import { getAllProducts } from "@/utils/actions/get-all-products";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { navigate } from "@/utils/actions/navigate";

import Loading from "./Loader";

import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "./ui/separator";
import { type Product, addItem } from "@/utils/actions/cart-management";
import { useToast } from "@/components/ui/use-toast";

export default function Products() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, error, isLoading, isFetched } = useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return getAllProducts();
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    console.log(error.message);
  }

  const handleAddToCart = async (product: Product) => {
    await addItem(product.id);
    queryClient.invalidateQueries({ queryKey: ["user_cart", "cart_count"] });
  };

  return (
    <>
      {data.length ? (
        data.map((product: Product) => (
          <Card
            key={product.id}
            className="cursor-pointer group product relative bg-transparent "
          >
            <CardContent className="flex justify-center items-center pb-2 pt-3 max-h-52 py-4 px-6">
              <Image
                className="object-cover max-h-52 max-w-48 h-44 w-48"
                alt={product.name}
                height={150}
                width={200}
                src={product.image}
              />
            </CardContent>
            <CardFooter className="pb-4 flex flex-col justify-center">
              <p className="font-medium">{product.name}</p>
              <span className="font-bold text-sm text-foreground/70 ">
                ${product.price.toFixed(2)}
              </span>
            </CardFooter>
            <div className="h-full w-full rounded-lg bg-zinc-700 group-hover:opacity-90 opacity-0 transition-opacity duration-300 absolute inset-0 justify-center items-center flex flex-col">
              <button
                className="font-bold text-sm hover:scale-[1.1] scale-100 duration-150 ease-in-out transition-transform"
                onClick={() => {
                  navigate(product.id);
                }}
              >
                View
              </button>
              <Separator className="invert max-w-[calc(50%)] my-2" />
              <button
                className="justify-center items-center flex flex-col space-y-2 hover:scale-[1.1] scale-100 duration-150 ease-in-out transition-transform"
                onClick={() => {
                  handleAddToCart(product);
                  toast({
                    title: "Cart Updated!",
                    description: `✅ Added ${product.name} to cart`,
                  });
                }}
              >
                <span className="text-sm font-bold">Add to Cart</span>
                <Image
                  alt="add-to-cart"
                  height={32}
                  width={32}
                  src="/cart.svg"
                />
              </button>
            </div>
          </Card>
        ))
      ) : (
        <Loading />
      )}
    </>
  );
}
