import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { getMakeAssistantQuestionFn } from "@/src/apis/aiProfileApi";
import Loading from "@/src/components/ui/Loading";
import CommonError from "@/src/components/ui/CommonError";
import MakeAssistantContainer from "@/src/features/makeAssistant/containers/MakeAssistantContainer";

/**
 * @description 어시스턴트 생성하는 페이지의 라우터
 */
function MakeAssistantRouter() {
  // 어시스턴트 복제인지 확인 & 어떤 어시스턴트 복제인지 query하기 위한 param
  const { aiProfileId } = useLocalSearchParams() as { aiProfileId: string | undefined };
  console.log(aiProfileId);

  // 어시스턴트 복제인 경우만 실행되는 query, 복제인 경우 원본의 answer를 받아옴
  const { isPending, isError, data, refetch } = useQuery({
    queryFn: () => (aiProfileId ? getMakeAssistantQuestionFn(aiProfileId) : Promise.reject("No aiProfileId")),
    queryKey: ["make-assistant-question", aiProfileId ?? ""],
    enabled: !!aiProfileId,
  });

  if (aiProfileId) {
    if (isPending) {
      return <Loading />;
    }

    if (isError) {
      return <CommonError titleText="에러 발생" buttonText="재시도" onPress={() => refetch()} />;
    }

    return <MakeAssistantContainer prevAnswer={data.result} />;
  }

  return <MakeAssistantContainer />;
}
export default MakeAssistantRouter;
