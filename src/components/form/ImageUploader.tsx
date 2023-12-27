// components/ImageUploader.tsx
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploaderProps {
  onUpload: (file: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onUpload(acceptedFiles);

      // 이미지 파일을 미리보기용으로 저장
      const imageUrls = acceptedFiles.map((file) => URL.createObjectURL(file));
      setPreviewImages((prevImages) => [...prevImages, ...imageUrls]);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": ["image/*"]
    },
    multiple: true
  });

  return (
    <div {...getRootProps()} className="border-dashed rounded border-2 border-gray-400 p-5 text-center cursor-pointer">
      <input {...getInputProps()} />
      <p>이미지를 드래그 앤 드롭하거나 클릭하여 업로드하세요.</p>
      {/* 이미지 프리뷰 렌더링 */}
      <div className="flex mt-[20px]">
        {previewImages.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Preview ${index + 1}`}
            className="w-[100px] h-[100px] object-cover mr-[10px]"
          />
        ))}
      </div>
    </div>
  );
};

// const previewContainerStyles: React.CSSProperties = {
//   display: "flex",
//   marginTop: "20px"
// };

// const previewImageStyles: React.CSSProperties = {
//   width: "100px",
//   height: "100px",
//   objectFit: "cover",
//   marginRight: "10px"
// };

// const dropzoneStyles: React.CSSProperties = {
//   border: "2px dashed #d9d9d9",
//   borderRadius: "4px",
//   padding: "20px",
//   textAlign: "center",
//   cursor: "pointer"
// };

export default ImageUploader;
