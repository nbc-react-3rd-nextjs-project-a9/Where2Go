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
  address: string;
  latlng: number[] | string[];
  imageUrl: Image;
  /**
   * supabase 구조 확정 후 삭제 여부 결정
   */
  placeId?: string;
}

interface PlaceReview {
  content: string;
  imageUrlList: Image[];
  visitedAt: Date;
  placeId: string;
  userId: string;
}
