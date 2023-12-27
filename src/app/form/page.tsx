"use client";
import ImageUploader from "@/components/form/ImageUploader";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const FormPage = () => {
  const handleUpload = (files: File[]) => {
    console.log("업로드된 파일:", files);
  };
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
    <>
      <h2>사진선택</h2>
      <ImageUploader onUpload={handleUpload} />
      <h2></h2>
    </>
  );
};

export default FormPage;
