import { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import CommonError from "@/src/components/ui/CommonError";
import Loading from "@/src/components/ui/Loading";
import AssistantList from "@/src/components/AssistantList";
import ChattingPage from "@/src/pages/Chatting";
import { FlexView } from "@/src/pages/Chatting/styles";
import useMakeThread from "@/src/hooks/useMakeThread";
import { getAiProfileId, setAiProfileId } from "@/src/libs/mmkv";
import { getThreadDateExpired } from "@/src/utils/time";
import { ThreadDate, ThreadDateSearchParams } from "@/src/types/threadTypes";
import { useSettingQuery } from "@/src/features/setting/hooks/queries/useSettingQuery"; // TODO: feature 간 참조가 발생하므로, FSD 위반, 어떻게 해결할까?
// 자는 시간만 불러오는 useSleepTimeQuery를 만들어서 사용하자.

function ChattingRouter(): JSX.Element | null {
  // 특정 날짜의 채팅 데이터를 readonly 시키기만 할건지 결정하는 querystring
  const { year, month, day } = useLocalSearchParams() as unknown as ThreadDateSearchParams;

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [threadDate, setThreadDate] = useState<ThreadDate | null>(null); // 스레드 생성 년월일 state
  const [expiredDate, setExpiredDate] = useState<Date | null>(null); // 스레드 제거 시점 Date 객체
  const { isPending, isError, data, refetch } = useSettingQuery(); // 사용자 설정 로드
  const { isPending: isMutatePending, isError: isMutateError, mutate } = useMakeThread();

  const handleMutate = useCallback(
    (sleepTime: string) => {
      if (year || month || day) return; // readonly의 경우 스레드 생성 mutation 실행 X
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
    [day, month, year, mutate]
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
    return <CommonError titleText="자는 시간을 불러오지 못했어요" buttonText="다시 불러오기" onPress={refetch} />;
  }

  // readonly 채팅방이 필요한 경우, 렌더링
  if (year && month && day) {
    return <ChattingPage threadDate={{ year, month, day }} expiredDate={new Date()} readonly={true} />;
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
        <CommonError titleText="서포터를 선택해주세요" buttonText="선택하기" onPress={() => setIsVisible(true)} />
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
