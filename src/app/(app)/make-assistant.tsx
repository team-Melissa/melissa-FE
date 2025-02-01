import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { getMakeAssistantQuestionFn } from "@/src/apis/aiProfileApi";
import Loading from "@/src/components/ui/Loading";
import CommonError from "@/src/components/ui/CommonError";
import MakeAssistantPage from "@/src/pages/MakeAssistant";

/**
 * @description 처음 새 어시스턴트 생성하는 페이지의 라우터
 */
function MakeAssistantRouter() {
  const { aiProfileId } = useLocalSearchParams() as { aiProfileId: string | undefined };
  console.log(aiProfileId);

  const { isPending, isError, data, refetch } = useQuery({
    queryFn: () =>
      aiProfileId ? getMakeAssistantQuestionFn(aiProfileId) : Promise.reject("No aiProfileId"),
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

    return <MakeAssistantPage prevAnswer={data.result} />;
  }

  return <MakeAssistantPage />;
}
export default MakeAssistantRouter;
