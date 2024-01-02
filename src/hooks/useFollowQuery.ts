import { addFollow, deleteFollow } from "@/api/follow";
import { getFollowListByUserId } from "@/api/places";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFollowQuery = () => {
  const queryClient = useQueryClient();
  const id = sessionStorage.getItem("uid");

  const { data: followingList, isLoading: isFollowingListLoading } = useQuery({
    queryKey: ["followingUser", id],
    queryFn: () => getFollowListByUserId(id)
  });

  const addFollowMutation = useMutation({
    mutationFn: addFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followingUser", id] });
    }
  });
  const deleteFollowMutation = useMutation({
    mutationFn: deleteFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followingUser", id] });
    }
  });

  return { followingList, isFollowingListLoading, addFollowMutation, deleteFollowMutation };
};
