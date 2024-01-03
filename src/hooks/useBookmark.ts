import { bookmarkAPI } from "@/api/bookmark";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  placeId: string;
  userId: string;
}

const useBookmark = ({ placeId, userId }: Props) => {
  const [isBookmark, setIsBookmark] = useState(false);

  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: ["bookmark"], queryFn: () => bookmarkAPI.getBookmarkList(userId) });

  const addBookmarkMutation = useMutation({
    mutationFn: () => bookmarkAPI.addBookmark(userId, placeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmark"] });
    }
  });

  const deleteBookmarkMutation = useMutation({
    mutationFn: () => bookmarkAPI.deleteBookmark(userId, placeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmark"] });
    }
  });

  const addBookmark = () => {
    addBookmarkMutation.mutate();
    toast.success("북마크 추가 완료");
  };

  const deleteBookmark = () => {
    deleteBookmarkMutation.mutate();
    toast.error("북마크 삭제");
  };

  useEffect(() => {
    const checkBookmark = async () => {
      const check = await bookmarkAPI.checkBookmark(userId, placeId);
      setIsBookmark(check);
    };

    checkBookmark();
  }, [data]);

  return { data, isBookmark, addBookmark, deleteBookmark };
};

export default useBookmark;
