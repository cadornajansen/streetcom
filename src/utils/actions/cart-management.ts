"use server";

import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";
import { getProduct } from "./get-a-product";
import { createUser } from "@/app/actions";

export type CartType = {
  items: [
    {
      id: number;
      name: string;
      price: number;
      quantity: number;
    }
  ];
};

export type Product = {
  created_at: string;
  description: string;
  image: string;
  price: number;
  id: number;
  name: string;
};

export async function getCart() {
  const user_identifier = await createUser();
  let cart: CartType | null = await kv.get(`cart-${user_identifier}`);
  return cart?.items;
}

export async function cartCount() {
  const items = await getCart();
  return items?.reduce((total, item) => total + item.quantity, 0);
}

export async function addItem(product_id: number) {
  const user_identifier = await createUser();
  console.log(product_id);
  let cart: CartType | null = await kv.get(`cart-${user_identifier}`);

  console.log("cart id", `cart-${user_identifier}`);
  let myCart = {} as CartType;

  const selectedProduct = await getProduct(product_id);

  if (!cart || !cart?.items) {
    myCart = {
      items: [
        {
          ...selectedProduct,
          quantity: 1,
        },
      ],
    };
  } else {
    let itemNotFound = true;

    myCart.items = cart.items.map((item) => {
      if (item.id === product_id) {
        itemNotFound = false;
        item.quantity += 1;
      }
      return item;
    }) as CartType["items"];

    if (itemNotFound) {
      myCart.items.push({
        ...selectedProduct,
        quantity: 1,
      });
    }
  }

  await kv.set(`cart-${user_identifier}`, myCart);
  console.log(JSON.stringify(cart));

  revalidatePath("/");
}

export async function delOneItem(product_id: number) {
  const user_identifier = await createUser();
  // Retrieving the cart based on the user ID
  let cart: CartType | null = await kv.get(`cart-${user_identifier}`);

  // Checking if the cart and its items exist
  if (cart && cart.items) {
    // Updating the quantity of the item or removing it if quantity becomes zero
    const updatedCart = {
      items: cart.items
        .map((item) => {
          if (item.id === product_id) {
            if (item.quantity > 1) {
              item.quantity -= 1;
            } else {
              return null;
            }
          }
          return item;
        })
        .filter(Boolean) as CartType["items"],
    };

    // Saving the updated cart to the KV storage
    await kv.set(`cart-${user_identifier}`, updatedCart);

    revalidatePath("/");
  }
}

export async function clearCart() {
  const user_identifier = await createUser();
  // Set the cart to an empty array
  await kv.set(`cart-${user_identifier}`, { items: [] });

  revalidatePath("/");
}
