"use client";
import ImageUploader from "@/components/form/ImageUploader";
import { supabase } from "@/lib/supabase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Section from "@/components/layout/Section";
import FilterTag from "@/components/filterTag/FilterTag";
import FilterTagList from "@/components/filterTag/FilterTagList";

const FormPage = () => {
  const [text, setText] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleUpload = (files: File[]) => {
    console.log("업로드된 파일:", files);
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  console.log(selectedDate);
  // useEffect(() => {
  //   const insertData = async () => {
  //     const { error } = await supabase.from("posts").insert([{ id: 1, name: "Denmark" }]);
  //     if (error) {
  //       throw error;
  //     }
  //   };
  //   insertData();
  // }, []);
  return (
    <div className="container m-auto">
      <Section title="사진 선택">
        <ImageUploader onUpload={handleUpload} />
      </Section>
      <Section title="설명">
        <textarea
          placeholder="경험이나 정보를 자세히 작성할수록 다른 사용자들에게 큰 도움이 됩니다."
          className="container border-black border-2 rounded resize-none"
          onChange={handleTextChange}
        />
      </Section>
      <Section title="방문 날짜">
        <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="yyyy/MM/dd" todayButton="오늘" />
      </Section>
      <FilterTagList tagType="category" />
    </div>
  );
};

export default FormPage;
