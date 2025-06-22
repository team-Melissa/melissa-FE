import endpoint from "@/src/constants/endpoint";
import axiosInstance from "@/src/libs/axiosInstance";
import { SuccessDTO } from "@/src/types/commonTypes";
import { useQuery } from "@tanstack/react-query";

type CheckNewUserDTO = SuccessDTO & { result: boolean };

const _getIsNewUser = async () => {
  const { data } = await axiosInstance.get<CheckNewUserDTO>(endpoint.setting.checkNew);
  return data.result;
};

export const IS_NEW_USER_QUERY_KEY = "IS_NEW_USER_QUERY_KEY";

export const useGetIsNewUser = () => {
  return useQuery({
    queryFn: _getIsNewUser,
    queryKey: [IS_NEW_USER_QUERY_KEY],
  });
};
