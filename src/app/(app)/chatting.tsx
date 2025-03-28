import { useState } from "react";
import styled from "styled-components/native";
import CommonError from "@/src/components/ui/CommonError";
import Loading from "@/src/components/ui/Loading";
import AssistantList from "@/src/components/AssistantList";
import { setAiProfileId } from "@/src/libs/mmkv";
import ChattingContainer from "@/src/features/chatting/containers/ChattingContainer";
import { useInitializeChatting } from "@/src/features/chatting/hooks/useInitializeChatting";
import { readOnlyTypeGuard } from "@/src/features/chatting/utils/readOnlyTypeGuard";

export default function ChattingRouter(): JSX.Element | null {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { isPending, isError, readOnlyDate, threadDate, threadExpiredDate, handleRetry } = useInitializeChatting();

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <CommonError titleText="에러가 발생했어요" buttonText="다시 시도" onPress={handleRetry} />;
  }

  // readonly 채팅방이 필요한 경우
  if (readOnlyTypeGuard(readOnlyDate)) {
    return <ChattingContainer threadDate={readOnlyDate} threadExpiredDate={new Date()} readonly={true} />;
  }

  if (!threadDate || !threadExpiredDate) {
    return (
      <FlexView>
        <AssistantList
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          onPressAiCard={(aiProfileId) => {
            setAiProfileId(aiProfileId);
            handleRetry();
          }}
        />
        <CommonError titleText="서포터를 선택해주세요" buttonText="선택하기" onPress={() => setIsVisible(true)} />
      </FlexView>
    );
  }

  return <ChattingContainer threadDate={threadDate} threadExpiredDate={threadExpiredDate} />;
}

const FlexView = styled.View`
  flex: 1;
`;
