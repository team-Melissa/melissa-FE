import endpoint from "@/src/constants/endpoint";
import axiosInstance from "@/src/libs/axiosInstance";
import { SuccessDTO } from "@/src/types/commonTypes";
import { useQuery } from "@tanstack/react-query";

type CheckNewUserDTO = SuccessDTO & { result: boolean };

const _getIsNewUser = async () => {
  const { data } = await axiosInstance.get<CheckNewUserDTO>(endpoint.setting.checkNew);
  console.log(data);
  return data;
};

export const useIsNewUserQuery = () => {
  return useQuery({
    queryFn: _getIsNewUser,
    queryKey: ["check-new-user"],
  });
};
