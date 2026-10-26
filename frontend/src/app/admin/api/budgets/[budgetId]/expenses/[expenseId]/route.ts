import { getAuthenticatedUser } from "@/auth/dal";
import { getToken } from "@/auth/token";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ budgetId: string; expenseId: string }> },
) {
  await getAuthenticatedUser();
  const jwt = await getToken();

  const { budgetId, expenseId } = await params;

  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`;

  const expenseReq = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  const json = await expenseReq.json();

  if (!expenseReq.ok) {
    return Response.json(json.error, { status: 403 });
  }

  return Response.json(json);
}
