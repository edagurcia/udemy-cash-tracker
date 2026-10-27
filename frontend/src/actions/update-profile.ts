"use server";

import { getToken } from "@/auth/token";
import {
  ErrorResponseSchema,
  SuccessSchema,
  UpdateProfileSchema,
} from "@/schemas";

type ActionStateType = {
  errors?: string[];
  success?: string;
};

export async function updateProfile(
  prevState: ActionStateType,
  formData: FormData,
) {
  const jwt = await getToken();

  const userProfile = UpdateProfileSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });

  if (!userProfile.success) {
    return {
      errors: userProfile.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const url = `${process.env.API_URL}/auth/update-profile`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      name: userProfile.data.name,
      email: userProfile.data.email,
    }),
  });

  const json = await req.json();

  if (!req.ok) {
    const result = ErrorResponseSchema.safeParse(json);

    return {
      errors: result.success
        ? [result.data.error]
        : [json.error || "Password invalido"],
      success: "",
    };
  }

  const success = SuccessSchema.parse(json);

  return {
    errors: [],
    success,
  };
}
