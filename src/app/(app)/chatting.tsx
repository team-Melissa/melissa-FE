import { useCallback, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import CommonError from "@/src/components/ui/CommonError";
import Loading from "@/src/components/ui/Loading";
import ChattingPage from "@/src/pages/Chatting";
import useUserSetting from "@/src/hooks/useUserSetting";
import { newThreadFn } from "@/src/apis/threadApi";
import { getAiProfileId } from "@/src/libs/mmkv";
import { getThreadDateExpired } from "@/src/utils/time";
import { ThreadDate } from "@/src/types/threadTypes";

function ChattingRouter(): JSX.Element | null {
  const [threadDate, setThreadDate] = useState<ThreadDate | null>(null); // 스레드 생성 년월일 state
  const [expiredDate, setExpiredDate] = useState<Date | null>(null); // 스레드 제거 시점 Date 객체
  const { isPending, isError, data, refetch } = useUserSetting(); // 사용자 설정 로드
  const {
    isPending: isMutatePending,
    isError: isMutateError,
    mutate,
  } = useMutation({
    mutationFn: newThreadFn,
    onSuccess: ({ result }) => {
      console.log(result);
      setThreadDate({ year: result.year, month: result.month, day: result.day });
    },
    onError: (error) => console.error(error.response?.data),
  });

  const handleMutate = useCallback(
    (sleepTime: string) => {
      const aiProfileId = getAiProfileId();
      if (aiProfileId) {
        const sleepHour = parseInt(sleepTime.slice(0, 2));
        const [{ year, month, day }, threadExpiredDate] = getThreadDateExpired(sleepHour);
        setExpiredDate(threadExpiredDate);
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
        titleText="자는 시간 로딩 중 에러 발생"
        buttonText="다시 시도"
        onPress={refetch}
      />
    );
  }

  if (isMutateError || !threadDate || !expiredDate) {
    return (
      <CommonError
        titleText="대화방 생성 중 에러 발생"
        buttonText="다시 시도"
        onPress={() => handleMutate(data.result.sleepTime)}
      />
    );
  }

  return <ChattingPage threadDate={threadDate} expiredDate={expiredDate} />;
}

export default ChattingRouter;
