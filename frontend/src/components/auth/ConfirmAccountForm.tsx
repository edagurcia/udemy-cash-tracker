"use client";

import { useState, useActionState, startTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  ActionStateType,
  confirmAccountAction,
} from "@/actions/confirm-account";
import { Card, CardContent } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export const ConfirmAccountForm = () => {
  const [token, setToken] = useState("");
  const router = useRouter();

  const [state, dispatch, isPending] = useActionState<ActionStateType, string>(
    async (prevState, currentToken) => {
      return confirmAccountAction(currentToken, prevState);
    },
    { errors: [], success: "" },
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      const timer = setTimeout(() => {
        router.push("/auth/login");
      }, 100);
      return () => clearTimeout(timer);
    }

    if (state.errors && state.errors.length > 0) {
      state.errors.map((err) => {
        toast.error(err);
      });
      setToken("");
    }
  }, [state, router]);

  const handleConfirmPin = async (completedToken: string) => {
    startTransition(() => {
      dispatch(completedToken);
    });
  };

  return (
    <Card className="py-12">
      <CardContent className="mx-auto">
        <InputOTP
          maxLength={6}
          value={token}
          onChange={setToken}
          onComplete={handleConfirmPin}
          disabled={isPending}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </CardContent>
    </Card>
  );
};
