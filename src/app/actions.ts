"use server";

import { cookies } from "next/headers";
import { uuid } from "uuidv4";

export async function createUser() {
  const cookieStore = cookies();

  let userIdentifier = cookieStore.get("user_identifier");

  if (!userIdentifier) {
    const newId = uuid();
    cookies().set("user_identifier", newId, {
      maxAge: 60 * 60 * 24 * 365,
    }); // 1 year
  }
  console.log("user id:", userIdentifier);
  return userIdentifier?.value;
}
