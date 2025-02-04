import { getMessagesFn, newThreadFn } from "@/src/apis/threadApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useMakeThread = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: newThreadFn,
    onSuccess: ({ result }) => {
      console.log(result);
      queryClient.prefetchQuery({
        queryFn: () => getMessagesFn({ year: result.year, month: result.month, day: result.day }),
        queryKey: ["message", { year: result.year, month: result.month, day: result.day }],
      });
    },
    onError: (error) => console.error(error.response),
  });
};

export default useMakeThread;
