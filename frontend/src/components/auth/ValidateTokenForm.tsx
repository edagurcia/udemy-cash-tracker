"use client";

import {
  useState,
  useActionState,
  startTransition,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from "react";
import { toast } from "react-toastify";
import { ActionStateType, validateTokenAction } from "@/actions/validate-token";
import { Card, CardContent } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type Props = {
  token: string;
  setIsValidToken: Dispatch<SetStateAction<boolean>>;
  setToken: Dispatch<SetStateAction<string>>;
};

export const ValidateTokenForm = ({
  token,
  setIsValidToken,
  setToken,
}: Props) => {
  const [state, dispatch, isPending] = useActionState<ActionStateType, string>(
    async (prevState, currentToken) => {
      return validateTokenAction(currentToken, prevState);
    },
    { errors: [], success: "" },
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      setIsValidToken(true);
    }

    if (state.errors && state.errors.length > 0) {
      state.errors.map((err) => {
        toast.error(err);
        setIsValidToken(false);
      });
      setToken("");
    }
  }, [state]);

  const handleConfirmPin = async (completedToken: string) => {
    startTransition(() => {
      dispatch(completedToken);
    });
  };

  return (
    <Card className="py-10 mt-10">
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
