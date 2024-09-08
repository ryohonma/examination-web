"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthUser } from "@luna/context/auth-user/auth-user";
import { captureException } from "@luna/lib/error";
import { post } from "@luna/repository/firestore/messages";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { postSchema } from "./validation-schema";

export const useMessagePost = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { authUser } = useAuthUser();

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: { text: "" },
  });

  const onSubmit = async (data: { text: string }) => {
    if (!authUser) return;

    try {
      await post({
        content: data.text,
        uid: authUser.uid,
      });
      setIsOpen(false);
    } catch (error) {
      captureException("failed to post message", error);
      return;
    }
  };

  return {
    isOpen,
    setIsOpen,
    watch,
    control,
    handleSubmit,
    errors,
    onSubmit,
  };
};
