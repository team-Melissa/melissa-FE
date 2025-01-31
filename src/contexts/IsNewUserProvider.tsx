import { createContext, ReactNode, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { checkNewUserFn } from "@/src/apis/settingApi";
import Loading from "@/src/components/ui/Loading";
import { Redirect } from "expo-router";

interface Props {
  children: ReactNode;
}

const IsNewUserContext = createContext<boolean | null>(null);

/**
 * @see https://velog.io/@cnsrn1874/react-query-and-react-context
 */
export const useIsNewUserContext = (): boolean => {
  const isNewUser = useContext(IsNewUserContext);
  if (isNewUser === null) throw new Error("isNewUser data not fetched");
  return isNewUser;
};

/**
 * @description 토큰이 존재하는지, 존재한다면 유효한지 검증,  
 * 체크하는동안 로딩 스크린 렌더링,  
 * 토큰 검증 성공하면 IndexRouter로 이동, 토큰 검증 실패하면 로그인으로 리다이렉트
 */
function IsNewUserProvider({ children }: Props): JSX.Element {
  const { isPending, isError, data } = useQuery({
    queryFn: checkNewUserFn,
    queryKey: ["check-new-user"],
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <Redirect href="/login" />;
  }

  return <IsNewUserContext.Provider value={data.result}>{children}</IsNewUserContext.Provider>;
}

export default IsNewUserProvider;
