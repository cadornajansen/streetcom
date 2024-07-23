"use client";

import Image from "next/image";
import { useState } from "react";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "./ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCart,
  delOneItem,
  addItem,
  clearCart,
  cartCount,
} from "@/utils/actions/cart-management";

import { useToast } from "./ui/use-toast";

export default function Cart() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data, error, isError, isLoading, isFetched } = useQuery({
    queryKey: ["user_cart"],
    queryFn: () => {
      return getCart();
    },
  });

  const { data: count } = useQuery({
    queryKey: ["cart_count"],
    queryFn: () => {
      return cartCount();
    },
  });

  const addItemMutation = useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_cart", "cart_count"] });
    },
  });

  const delItemMutation = useMutation({
    mutationFn: delOneItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_cart", "cart_count"] });
    },
  });

  if (error) {
    console.log(error.message);
  }

  const [isOpen, setIsOpen] = useState(false);

  function openOffcanvas() {
    setIsOpen(true);
  }

  function closeOffcanvas() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openOffcanvas} className="flex gap-2 items-center">
        <Image className="" width={24} height={24} src="/cart.svg" alt="cart" />
        {count && count > 0 ? <span>{count}</span> : <span>Empty</span>}
      </button>
      <div>
        {/* Offcanvas Container */}
        <Transition appear show={isOpen}>
          <Dialog as="div" className="relative z-90" onClose={closeOffcanvas}>
            {/* Backdrop */}
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0  backdrop-blur-sm bg-zinc-800/75" />
            </TransitionChild>
            {/* END Backdrop */}

            {/* Offcanvas */}
            <div className="fixed inset-0 overflow-y-auto overflow-x-hidden">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="ease-in duration-200"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="absolute right-0 top-0 flex h-dvh w-72 flex-col shadow-lg sm:w-full sm:max-w-md bg-zinc-900 text-zinc-100 shadow-zinc-950">
                  {/* Header */}
                  <div className="flex min-h-16 flex-none items-center justify-between border-b  px-5 md:px-7 border-zinc-800">
                    <DialogTitle as="h3" className="py-5 font-medium">
                      My Cart
                    </DialogTitle>

                    {/* Close Button */}
                    <button
                      onClick={closeOffcanvas}
                      type="button"
                      className="group inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold leading-5  hover:shadow-sm focus:ring active:shadow-none border-transparent text-zinc-300 hover:border-zinc-600 hover:text-zinc-200 focus:ring-zinc-600/40 active:border-zinc-700"
                    >
                      <svg
                        className="group-hover:rotate-45 rotate-180 duration-150 ease-in-out transition-all hi-solid hi-x -mx-1 inline-block size-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {/* END Close Button */}
                  </div>
                  {/* END Header */}

                  {/* Content */}
                  <div className="flex grow flex-col overflow-y-auto p-3 md:p-7">
                    <Table className="w-full table-fixed">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[calc(100% - 96px - 80px)]">
                            Name
                          </TableHead>
                          <TableHead className="w-24">Quantity</TableHead>
                          <TableHead className="w-20">Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          <>
                            <TableRow>
                              <TableCell className="text-center">
                                <Skeleton className="h-6 w-full" />
                              </TableCell>
                              <TableCell className="text-center">
                                <Skeleton className="h-6 w-full" />
                              </TableCell>
                              <TableCell className="text-center">
                                <Skeleton className="h-6 w-full" />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="text-center">
                                <Skeleton className="h-6 w-full" />
                              </TableCell>
                              <TableCell className="text-center">
                                <Skeleton className="h-6 w-full" />
                              </TableCell>
                              <TableCell className="text-center">
                                <Skeleton className="h-6 w-full" />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="text-center">
                                <Skeleton className="h-6 w-full" />
                              </TableCell>
                              <TableCell className="text-center">
                                <Skeleton className="h-6 w-full" />
                              </TableCell>
                              <TableCell className="text-center">
                                <Skeleton className="h-6 w-full" />
                              </TableCell>
                            </TableRow>
                          </>
                        ) : data && data.length > 0 ? (
                          data.map((cartItem: any) => (
                            <TableRow key={cartItem.id}>
                              <TableCell className="font-medium flex items-center gap-2 overflow-hidden">
                                <Image
                                  height={24}
                                  width={24}
                                  alt={cartItem.name}
                                  src={cartItem.image}
                                />
                                {cartItem.name}
                              </TableCell>
                              <TableCell className="text-center w-24">
                                <div className="flex gap-2 items-center justify-center">
                                  <button
                                    onClick={() => {
                                      delItemMutation.mutate(cartItem.id);
                                    }}
                                    className="hover:opacity-60 opacity-100"
                                  >
                                    -
                                  </button>
                                  {cartItem.quantity}
                                  <button
                                    onClick={() => {
                                      addItemMutation.mutate(cartItem.id);
                                    }}
                                    className="hover:opacity-60 opacity-100"
                                  >
                                    +
                                  </button>
                                </div>
                              </TableCell>
                              <TableCell className="w-20">
                                <span className="text-sm font-semibold">
                                  $
                                  {(cartItem.quantity * cartItem.price).toFixed(
                                    1
                                  )}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : isError ? (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center">
                              {error.message}
                            </TableCell>
                          </TableRow>
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={3}
                              className="text-center opacity-60"
                            >
                              No items in cart
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>

                    {data && data.length > 0 ? (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className="mt-5" variant="destructive">
                            Clear Cart
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Clear Cart</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove all items from
                              your cart? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                clearCart();
                                queryClient.invalidateQueries({
                                  queryKey: ["user_cart", "cart_count"],
                                });

                                toast({
                                  variant: "destructive",
                                  title: "Cart Cleared",
                                  description:
                                    "All items was removed from your cart",
                                });
                              }}
                            >
                              Clear
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    ) : null}
                  </div>
                  {/* END Content */}
                </DialogPanel>
              </TransitionChild>
            </div>
            {/* END Offcanvas */}
          </Dialog>
        </Transition>
        {/* END Offcanvas Container */}
      </div>
      {/* END Offcanvas: With Backdrop */}
    </div>
  );
}
