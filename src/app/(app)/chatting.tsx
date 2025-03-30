import styled from "styled-components/native";
import CommonError from "@/src/components/ui/CommonError";
import Loading from "@/src/components/ui/Loading";
import ChattingContainer from "@/src/features/chatting/containers/ChattingContainer";
import AssistantListContainer from "@/src/features/assistantList/containers/AssistantListContainer";
import { useInitializeChatting } from "@/src/features/chatting/hooks/useInitializeChatting";
import { readOnlyTypeGuard } from "@/src/features/chatting/utils/readOnlyTypeGuard";

export default function ChattingRouter(): JSX.Element | null {
  const { isPending, isError, readOnlyDate, threadDate, threadExpiredDate, handleRetry } = useInitializeChatting();

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <CommonError titleText="에러가 발생했어요" buttonText="다시 시도" onPress={handleRetry} />;
  }

  // readonly 채팅방이 필요한 경우
  if (readOnlyTypeGuard(readOnlyDate)) {
    return <ChattingContainer threadDate={readOnlyDate} threadExpiredDate={new Date()} readonly />;
  }

  if (!threadDate || !threadExpiredDate) {
    return (
      <FlexView>
        <CommonError titleText="문제가 발생했어요." buttonText="다시 시도" onPress={handleRetry} />
      </FlexView>
    );
  }

  return (
    <ChattingContainer
      threadDate={threadDate}
      threadExpiredDate={threadExpiredDate}
      renderAssistantList={({ isVisible, setIsVisible, onPressAiCard }) => (
        <AssistantListContainer isVisible={isVisible} setIsVisible={setIsVisible} onPressAiCard={onPressAiCard} />
      )}
    />
  );
}

const FlexView = styled.View`
  flex: 1;
`;
