import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";

import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";

import { getCart } from "@/utils/actions/cart-management";

const Header = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["user_cart"],
    queryFn: () => {
      return getCart();
    },
  });

  return (
    <>
      <header className="flex items-center w-full space-x-10 justify-between">
        <nav className="flex">
          <Image
            className="w-40 h-20 mr-12"
            alt="logo"
            height={100}
            width={100}
            src="/logo.svg"
          />
          <ul className="text-sm font-semibold flex items-center gap-10">
            <li>
              <Link href="#">About Us</Link>
            </li>
            <li>
              <Link href="/">Shop</Link>
            </li>
          </ul>
        </nav>
        <div className="bg-foreground flex h-10 w-full max-w-xl rounded-md border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <Image
            className="mr-2"
            width={25}
            height={25}
            alt="search"
            src="/Search.png"
          />
          <input
            className="text-background bg-transparent outline-none"
            placeholder="Search for products here..."
          />
        </div>
        <Cart />
      </header>
    </>
  );
};

export default Header;
