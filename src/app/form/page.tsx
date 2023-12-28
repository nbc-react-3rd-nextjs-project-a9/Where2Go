"use client";
import ImageUploader from "@/components/form/ImageUploader";
import { supabase } from "@/lib/supabase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Section from "@/components/layout/Section";
import FilterTag from "@/components/filterTag/FilterTag";
import FilterTagList from "@/components/filterTag/FilterTagList";
import useTag from "@/hooks/useTag";
import { categoryTagList } from "@/data/tagData";
import SearchMap from "../map/SearchMap";
import MapContainer from "../map/MapContainer";
import Script from "next/script";
import Button from "@/components/Button";
import useMapStore from "@/store/store";

const FormPage = () => {
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>();
  const [categoryValue, onChangeCategory] = useTag();
  const { info } = useMapStore();
  const categoryFormTagList = categoryTagList.filter((tag) => tag !== "전체");

  const handleUpload = (files: File[]) => {
    // console.log("업로드된 파일:", files);
    setImageFiles(files);
  };
  console.log("업로드된 파일:", imageFiles);
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const submitForm = async () => {
    try {
      if (!content || !selectedDate || !imageFiles) {
        console.error("내용과 날짜와 이미지는 필수 필드입니다.");
        return;
      }
      // 각 이미지 파일을 업로드하고 해당 URL을 기록할 배열
      const uploadedImageUrls: string[] = [];
      // 각 이미지 파일을 Supabase Storage에 업로드
      for (const imageFile of imageFiles) {
        // const encodedFileName = encodeURIComponent(imageFile.name);

        const { data: fileData, error: fileError } = await supabase.storage
          .from("placeReviewImg")
          .upload(`${imageFile.name}`, imageFile);

        if (fileError) {
          console.error("이미지 업로드 중 오류 발생:", fileError.message);
          return;
        }
        // 이미지 파일의 URL을 배열에 추가
        const imageUrl = fileData.path;
        uploadedImageUrls.push(imageUrl);
        console.log(fileData);
      }

      //Supabase 'placeReview' 테이블에 데이터 삽입
      const { data: placeReviewData, error: placeReviewError } = await supabase.from("placeReview").insert([
        {
          content,
          visitedAt: selectedDate.toISOString(),
          imageUrlList: uploadedImageUrls, // 이미지 파일의 URL 배열을 저장
          placeId: "123",
          category: categoryValue
        }
      ]);

      const { data: placeData, error: placeError } = await supabase.from("place").insert([
        {
          placeName: info.content,
          address: info.address,
          latlng: info.position,
          imageUrl: imageFiles[0]
        }
      ]);

      if (placeReviewError) {
        console.error("placeReview 데이터 삽입 중 오류 발생:", placeReviewError.message);
      } else {
        console.log("placeReview 데이터가 성공적으로 삽입되었습니다:", placeReviewData);
      }
      if (placeError) {
        console.error("place 데이터 삽입 중 오류 발생", placeError.message);
      } else {
        console.log("place 데이터 삽입 성공", placeData);
      }
    } catch (error) {
      console.log("예상치 못한 오류가 발생했습니다:");
    }
  };
  console.log(selectedDate);
  console.log(categoryValue);
  console.log(imageFiles);
  console.log("info!!", info);
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
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy/MM/dd"
          todayButton="오늘"
          className="border-black border-2 rounded"
        />
      </Section>
      <Section title="카테고리">
        <FilterTagList list={categoryFormTagList} onChange={onChangeCategory} />
      </Section>
      <Section title="장소 선택">
        <div className="container m-auto">
          <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />
          <Script
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`}
            strategy="beforeInteractive"
          />
          <SearchMap />
        </div>
      </Section>
      <Button onClick={submitForm}>제출</Button>
    </div>
  );
};

export default FormPage;
