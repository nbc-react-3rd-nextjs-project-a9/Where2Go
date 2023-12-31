interface User {
  nickname: string;
  email: string;
  imageUrl: Image;
  /**
   * supabase 구조 확정 후 삭제 여부 결정
   */
  userId?: string;
}

interface Image {
  path: string;
  url: string;
}

interface Follow {
  follower: string;
  following: string;
}

interface Place {
  placeName: string;
  placeId: string;
  address: string;
  latlng: position;
  imageUrl: Image;
  category: CategoryType;
}

interface PlaceReview {
  placeReviewId: string;
  content: string;
  imageUrlList: string[];
  visitedAt: Date;
  category: string;
  placeName: string;
  userId: string;
}

type position = {
  lat: number;
  lng: number;
};

interface Marker {
  position: position;
  content: string;
  address: string;
  placeName: string;
}

type CategoryType = "전체" | "카페" | "아웃도어" | "레스토랑" | "미술관" | "공원" | "기타";
