import { Dispatch, SetStateAction, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "@/components/Button";

interface UpdatePostFormProps {
  initialData: {
    // category: string;
    placeReviewId: string;
    content: string;
    placeId: string;
    userId: string;
    visitedAt: string;
    imageUrlList: string[];
  };
  onCancel: () => void;
  placeId: string;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  placeData: string[];
}

const UpdatePostForm = ({ initialData, onCancel, placeId, setIsEditing, placeData }: UpdatePostFormProps) => {
  console.log("플레이스데이터", placeData);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      content: initialData.content
    }
  });
  const router = useRouter();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: { content: string }) => {
      await supabase.from("placeReview").update(data).eq("placeReviewId", initialData.placeReviewId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["placeReview", placeId]
      });
      router.push(`/posts/${placeId}/${initialData.userId}`);
      setIsEditing(false);
    }
  });

  const onSubmit = (data: { content: string }) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea {...register("content")} className="px-2 py-1 border-2 border-purple-900" />
      <Button type="submit">수정하기</Button>
      <Button onClick={onCancel}>취소</Button>
    </form>
  );
};

export default UpdatePostForm;
