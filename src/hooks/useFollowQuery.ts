import { addFollow, deleteFollow } from "@/api/follow";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useFollowQuery = () => {
  const queryClient = useQueryClient();
  const id = sessionStorage.getItem("uid");
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

  return { addFollowMutation, deleteFollowMutation };
};
