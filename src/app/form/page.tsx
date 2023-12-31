"use client";
import ImageUploader from "@/components/form/ImageUploader";
import { supabase } from "@/lib/supabase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Section from "@/components/layout/Section";
import FilterTagList from "@/components/filterTag/FilterTagList";
import useTag from "@/hooks/useTag";
import { categoryTagList } from "@/data/tagData";
import PlacesSearch from "@/components/map/PlacesSearch";
import MapContainer from "@/components/map/MapContainer";
import Script from "next/script";
import Button from "@/components/Button";
import useMapStore from "@/store/store";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const FormPage = () => {
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>();
  const [categoryValue, onChangeCategory] = useTag();
  const { info } = useMapStore();
  const categoryFormTagList = categoryTagList.filter((tag) => tag !== "전체");
  const router = useRouter();
  const id = uuidv4();

  const handleUpload = (files: File[]) => {
    setImageFiles(files);
  };
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
      const uploadedImageUrls: string[] = [];
      for (const imageFile of imageFiles) {
        const { data: fileData, error: fileError } = await supabase.storage
          .from("placeReviewImg")
          .upload(`${imageFile.name}`, imageFile);
        if (fileError) {
          console.error("이미지 업로드 중 오류 발생:", fileError.message);
          return;
        }
        const imageUrl = fileData.path;
        uploadedImageUrls.push(imageUrl);
      }
      const placeName = info.content;
      //Supabase 'placeReview' 테이블에 데이터 삽입
      const { data: placeReviewData, error: placeReviewError } = await supabase.from("placeReview").insert([
        {
          content,
          visitedAt: selectedDate.toISOString(),
          imageUrlList: uploadedImageUrls, // 이미지 파일의 URL 배열을 저장
          placeName: info.content,
          category: categoryValue
        }
      ]);
      const { data: existingPlaceData } = await supabase.from("places").select().eq("placeName", placeName);
      console.log("existingPlaceData", existingPlaceData);
      if (!existingPlaceData || existingPlaceData.length === 0) {
        // placeId에 해당하는 데이터가 없다면 place 데이터 삽입
        const { data: placeData, error: placeError } = await supabase.from("places").insert([
          {
            placeName: info.content,
            address: info.address,
            latlng: info.position,
            imageUrl: imageFiles[0],
            category: categoryValue
          }
        ]);

        if (placeError) {
          console.error("place 데이터 삽입 중 오류 발생", placeError.message);
        } else {
          console.log("place 데이터 삽입 성공", placeData);
        }
      }

      if (placeReviewError) {
        console.error("placeReview 데이터 삽입 중 오류 발생:", placeReviewError.message);
      } else {
        console.log("placeReview 데이터가 성공적으로 삽입되었습니다:", placeReviewData);
      }
      toast.success("업로드 성공!");
      router.push("/");
    } catch (error) {
      console.log("예상치 못한 오류가 발생했습니다:", error);
    }
  };

  return (
    <div className="">
      <Section title="사진 선택">
        <ImageUploader onUpload={handleUpload} />
      </Section>
      <Section title="방문 날짜">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy/MM/dd"
          todayButton="오늘"
          className="border-purple-900 border-2 rounded"
        />
      </Section>
      <Section title="설명">
        <textarea
          placeholder="경험이나 정보를 자세히 작성할수록 다른 사용자들에게 큰 도움이 됩니다."
          className="border-purple-900 border-2 rounded resize-none w-[530px] h-[120px]"
          onChange={handleTextChange}
        />
      </Section>
      <Section title="카테고리">
        <FilterTagList list={categoryFormTagList} onChange={onChangeCategory} />
      </Section>
      <Section title="장소 선택">
        <div className="">
          <PlacesSearch />
        </div>
      </Section>
      <div className="flex justify-center">
        <Button
          onClick={submitForm}
          disabled={!imageFiles || !selectedDate || !content || !categoryValue || !info.address}
        >
          제출
        </Button>
      </div>
    </div>
  );
};

export default FormPage;
