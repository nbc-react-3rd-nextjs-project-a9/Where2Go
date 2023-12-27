"use client";
import ImageUploader from "@/components/form/ImageUploader";
import { supabase } from "@/lib/supabase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

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
      <h2>사진 선택</h2>
      <ImageUploader onUpload={handleUpload} />
      <h2>설명</h2>
      <textarea
        placeholder="경험이나 정보를 자세히 작성할수록 다른 사용자들에게 큰 도움이 됩니다."
        className="container border-black border-2 rounded resize-none"
        onChange={handleTextChange}
      />
      <h2>방문날짜</h2>
      <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="yyyy/MM/dd" todayButton="오늘" />
    </div>
  );
};

export default FormPage;
