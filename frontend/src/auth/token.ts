"use server";

import { cookies } from "next/headers";

export async function getToken() {
  const jwt = (await cookies()).get("CASHTRACKR_TOKEN")?.value;

  return jwt;
}
