import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "@/components/Button";

interface UpdatePostFormProps {
  initialData: {
    placeReviewId: string;
    content: string;
    placeId: string;
    userId: string;
    // Add other necessary fields
  };
  onCancel: () => void;
}

const UpdatePostForm = ({ initialData, onCancel }: UpdatePostFormProps) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      content: initialData.content // 여기에 수정할 데이터의 기본값을 넣어줍니다.
    }
  });
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: { content: string }) => {
      await supabase.from("placeReview").update(data).eq("placeReviewId", initialData.placeReviewId);
    },
    onSuccess: () => {
      router.push(`/posts/${initialData.placeId}/${initialData.userId}`);
    }
  });

  const onSubmit = (data: { content: string }) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 수정할 내용을 입력하는 폼 */}
      <textarea {...register("content")} />
      <Button type="submit">수정하기</Button>
      <Button onClick={onCancel}>취소</Button>
    </form>
  );
};

export default UpdatePostForm;
