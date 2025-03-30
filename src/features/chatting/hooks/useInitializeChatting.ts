import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { useSleepTimeQuery } from "./queries/useSleepTimeQuery";
import { useAiProfileIdQuery } from "./queries/useAiProfileIdQuery";
import { useMakeThreadMutation } from "./mutations/useMakeThreadMutation";
import { getThreadDateExpired } from "../utils/time";
import type { TThreadDate, TThreadDateSearchParams } from "../types/chattingTypes";

export const useInitializeChatting = () => {
  const [isFirstEffect, setIsFirstEffect] = useState<boolean>(true);
  const { year, month, day } = useLocalSearchParams() as unknown as TThreadDateSearchParams;
  const [threadDate, setThreadDate] = useState<TThreadDate | null>(null);
  const [threadExpiredDate, setThreadExpiredDate] = useState<Date | null>(null);

  const {
    isPending: isAiProfileIdPending,
    isError: isAiProfileIdError,
    data: aiProfileId,
    refetch: refetchAiProfileId,
  } = useAiProfileIdQuery();
  const {
    isPending: isSleepTimePending,
    isError: isSleepTimeError,
    data: sleepTime,
    refetch: refetchSleepTime,
  } = useSleepTimeQuery();
  const { isPending: isMutatePending, isError: isMutateError, mutate } = useMakeThreadMutation();

  const isPending = isSleepTimePending || isAiProfileIdPending || isMutatePending;
  const isError = isSleepTimeError || isAiProfileIdError || isMutateError;
  const readOnlyDate = { year, month, day };

  const handleMakeThreadMutate = useCallback(
    (sleepTime: string, aiProfileId: number) => {
      if (year || month || day) return;
      if (aiProfileId) {
        const sleepHour = parseInt(sleepTime.slice(0, 2));
        const [{ year, month, day }, expiredDate] = getThreadDateExpired(sleepHour);
        setThreadDate({ year, month, day });
        setThreadExpiredDate(expiredDate);
        mutate({ aiProfileId, year, month, day });
      }
    },
    [year, month, day, mutate]
  );

  const handleRetry = async () => {
    await Promise.all([refetchAiProfileId(), refetchSleepTime()]);
    if (sleepTime && aiProfileId) {
      handleMakeThreadMutate(sleepTime, aiProfileId);
    }
  };

  useEffect(() => {
    if (isFirstEffect && sleepTime && aiProfileId) {
      handleMakeThreadMutate(sleepTime, aiProfileId);
      setIsFirstEffect(false);
    }
  }, [aiProfileId, handleMakeThreadMutate, isFirstEffect, sleepTime]);

  return { isPending, isError, readOnlyDate, threadDate, threadExpiredDate, handleRetry };
};
