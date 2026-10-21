// Data Access Layer (DAL)

import "server-only"; // dependencia de terceros, este código se queda en el lado del servidor y no se pasa al cliente
import { cache } from "react";
import { redirect } from "next/navigation";
import { getToken } from "./token";
import { UserSchema } from "@/schemas";

export const getAuthenticatedUser = cache(async () => {
  const jwt = await getToken();

  if (!jwt) {
    redirect("/auth/login");
  }

  const url = `${process.env.API_URL}/auth/user`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  const session = await req.json();
  const result = UserSchema.safeParse(session);

  if (!result.success) {
    redirect("/auth/login");
  }

  return {
    user: result.data,
    isAuth: true,
  };
});
