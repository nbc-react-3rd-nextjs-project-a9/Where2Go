import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "@/components/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Section from "@/components/layout/Section";

interface UpdatePostFormProps {
  initialData: {
    placeReviewId: string;
    content: string;
    placeId: string;
    userId: string;
    visitedAt: Date;
    imageUrlList: string[];
  };
  onCancel: () => void;
  placeId: string;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

const UpdatePostForm = ({ initialData, onCancel, placeId, setIsEditing }: UpdatePostFormProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  console.log("선택한날짜", selectedDate);
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      content: initialData.content,
      visitedAt: initialData.visitedAt // 날짜 형식에 주의하여 변환
    }
  });

  // useEffect를 사용하여 visitedAt의 변경에 따라 setValue를 통해 react-hook-form에 값을 설정
  useEffect(() => {
    setValue("visitedAt", selectedDate);
  }, [selectedDate]);

  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: { content: string; visitedAt: Date }) => {
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

  const onSubmit = (data: { content: string; visitedAt: Date }) => {
    // visitedAt의 경우 Date 형식으로 전달받게 수정
    console.log("data.visitedAt", data.visitedAt);
    mutation.mutate({
      ...data,
      visitedAt: data.visitedAt
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <Section title="리뷰">
        <textarea {...register("content")} className="px-2 py-1 border-2 border-purple-900 w-[530px] h-[120px]" />
      </Section>
      <Section title="방문날짜">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy/MM/dd"
          todayButton="오늘"
          className="border-purple-900 border-2 rounded"
        />
      </Section>
      <div className="my-[100px] flex gap-2 justify-center">
        <Button type="submit">수정하기</Button>
        <Button onClick={onCancel}>취소</Button>
      </div>
    </form>
  );
};

export default UpdatePostForm;
