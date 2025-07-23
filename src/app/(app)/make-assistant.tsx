import { useLocalSearchParams } from "expo-router";
import MakeAssistantContainer from "@/src/features/makeAssistant/containers/MakeAssistantContainer";
import { useMakeAssistantQuestionQuery } from "@/src/features/makeAssistant/hooks/queries/useMakeAssistantQuestionQuery";

/**
 * @description 어시스턴트 생성하는 페이지의 라우터
 */
function MakeAssistantRouter() {
  // 어시스턴트 복제인지 확인 & 어떤 어시스턴트 복제인지 query하기 위한 param
  const { aiProfileId } = useLocalSearchParams() as { aiProfileId: string | undefined };

  // 어시스턴트 복제인 경우만 실행되는 query, 복제인 경우 원본의 answer를 받아옴
  const { data } = useMakeAssistantQuestionQuery(aiProfileId);

  if (aiProfileId) {
    return <MakeAssistantContainer prevAnswer={data?.result} />;
  }

  return <MakeAssistantContainer />;
}
export default MakeAssistantRouter;
