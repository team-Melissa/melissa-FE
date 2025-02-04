import { useCallback, useEffect, useState } from "react";
import CommonError from "@/src/components/ui/CommonError";
import Loading from "@/src/components/ui/Loading";
import AssistantList from "@/src/components/AssistantList";
import ChattingPage from "@/src/pages/Chatting";
import { FlexView } from "@/src/pages/Chatting/styles";
import useUserSetting from "@/src/hooks/useUserSetting";
import useMakeThread from "@/src/hooks/useMakeThread";
import { getAiProfileId, setAiProfileId } from "@/src/libs/mmkv";
import { getThreadDateExpired } from "@/src/utils/time";
import { ThreadDate } from "@/src/types/threadTypes";

function ChattingRouter(): JSX.Element | null {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [threadDate, setThreadDate] = useState<ThreadDate | null>(null); // 스레드 생성 년월일 state
  const [expiredDate, setExpiredDate] = useState<Date | null>(null); // 스레드 제거 시점 Date 객체
  const { isPending, isError, data, refetch } = useUserSetting(); // 사용자 설정 로드
  const { isPending: isMutatePending, isError: isMutateError, mutate } = useMakeThread();

  const handleMutate = useCallback(
    (sleepTime: string) => {
      const aiProfileId = getAiProfileId();
      if (aiProfileId) {
        const sleepHour = parseInt(sleepTime.slice(0, 2));
        const [{ year, month, day }, threadExpiredDate] = getThreadDateExpired(sleepHour);
        setExpiredDate(threadExpiredDate);
        setThreadDate({ year, month, day });
        mutate({
          aiProfileId,
          year,
          month,
          day,
        });
      }
    },
    [mutate]
  );

  useEffect(() => {
    if (data) {
      handleMutate(data.result.sleepTime);
    }
  }, [data, handleMutate]);

  if (isPending || isMutatePending) {
    return <Loading />;
  }

  if (isError) {
    return (
      <CommonError
        titleText="자는 시간을 불러오지 못했어요"
        buttonText="다시 불러오기"
        onPress={refetch}
      />
    );
  }

  if (!threadDate || !expiredDate) {
    return (
      <FlexView>
        <AssistantList
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          onPressAiCard={(aiProfileId) => {
            setAiProfileId(aiProfileId);
            handleMutate(data.result.sleepTime);
          }}
        />
        <CommonError
          titleText="서포터를 선택해주세요"
          buttonText="선택하기"
          onPress={() => setIsVisible(true)}
        />
      </FlexView>
    );
  }

  if (isMutateError) {
    return (
      <CommonError
        titleText="대화방 생성에 실패했어요"
        buttonText="다시 시도하기"
        onPress={() => handleMutate(data.result.sleepTime)}
      />
    );
  }

  return <ChattingPage threadDate={threadDate} expiredDate={expiredDate} />;
}

export default ChattingRouter;
