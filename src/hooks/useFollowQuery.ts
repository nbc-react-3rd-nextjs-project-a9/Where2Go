import { addFollow, deleteFollow } from "@/api/follow";
import { getFollowListByUserId } from "@/api/places";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFollowQuery = () => {
  const queryClient = useQueryClient();
  const id = sessionStorage.getItem("uid") as string;

  // const { data: followId, isLoading: isFollwIdLoading } = useQuery({});
  const { data: followingList, isLoading: isFollowingListLoading } = useQuery({
    queryKey: ["followingUser", id],
    queryFn: () => getFollowListByUserId(id)
  });

  const addFollowMutation = useMutation({
    mutationFn: addFollow,
    onMutate: async (newFollow: Follow) => {
      await queryClient.cancelQueries({ queryKey: ["followingUser", id] });
      const previousTodos = queryClient.getQueryData(["followingUser", id]);
      queryClient.setQueryData(["followingUser", id], (old: Follow[]) => [...old, newFollow]);
      return { previousTodos };
    },
    onError: (err, newFollow, context: any) => {
      queryClient.setQueryData(["followingUser", id], context.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["followingUser", id] });
    }
  });

  const deleteFollowMutation = useMutation({
    mutationFn: deleteFollow,
    onMutate: async (newFollow: Follow) => {
      await queryClient.cancelQueries({ queryKey: ["followingUser", id] });
      const previousTodos = queryClient.getQueryData(["followingUser", id]);
      queryClient.setQueryData(["followingUser", id], (old: Follow[]) => [...old, newFollow]);
      return { previousTodos };
    },
    onError: (err, newFollow, context: any) => {
      queryClient.setQueryData(["followingUser", id], context.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["followingUser", id] });
    }
  });

  return { followingList, isFollowingListLoading, addFollowMutation, deleteFollowMutation };
};
