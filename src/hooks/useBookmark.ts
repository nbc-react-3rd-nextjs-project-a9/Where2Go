import { bookmark } from "@/api/bookmark";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";

const useBookmark = () => {
  const queryClient = useQueryClient();
  const userId = "0fe6b943-b306-4c93-88b7-8118a3d2fb5e";

  const { isLoading, data } = useQuery({
    queryKey: ["bookmark"],
    queryFn: () => bookmark.getBookmarkList(userId)
  });

  return data;
};

export default useBookmark;
