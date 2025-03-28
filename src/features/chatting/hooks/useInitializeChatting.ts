import { useLocalSearchParams } from "expo-router";
import { TThreadDate, type TThreadDateSearchParams } from "../types/chattingTypes";
import { useCallback, useEffect, useState } from "react";
import { useSleepTimeQuery } from "./queries/useSleepTimeQuery";
import { useMakeThreadMutation } from "./mutations/useMakeThreadMutation";
import { getAiProfileId } from "@/src/libs/mmkv";
import { getThreadDateExpired } from "../utils/time";

export const useInitializeChatting = () => {
  const { year, month, day } = useLocalSearchParams() as unknown as TThreadDateSearchParams;
  const [threadDate, setThreadDate] = useState<TThreadDate | null>(null);
  const [threadExpiredDate, setThreadExpiredDate] = useState<Date | null>(null);

  const { isPending: isSleepTimePending, isError: isSleepTimeError, data: sleepTime, refetch } = useSleepTimeQuery();
  const { isPending: isMutatePending, isError: isMutateError, mutate } = useMakeThreadMutation();

  const isPending = isSleepTimePending || isMutatePending;
  const isError = isSleepTimeError || isMutateError;
  const readOnlyDate = { year, month, day };

  const handleMakeThreadMutate = useCallback(
    (sleepTime: string) => {
      if (year || month || day) return;
      const aiProfileId = getAiProfileId();
      if (aiProfileId) {
        const sleepHour = parseInt(sleepTime.slice(0, 2));
        const [{ year, month, day }, expiredDate] = getThreadDateExpired(sleepHour);
        setThreadDate({ year, month, day });
        setThreadExpiredDate(expiredDate);
        mutate({ aiProfileId, year, month, day });
      }
    },
    [day, month, year, mutate]
  );

  const handleRetry = async () => {
    await refetch();
    if (sleepTime) {
      handleMakeThreadMutate(sleepTime);
    }
  };

  useEffect(() => {
    if (sleepTime) handleMakeThreadMutate(sleepTime);
  }, [handleMakeThreadMutate, sleepTime]);

  return { isPending, isError, readOnlyDate, threadDate, threadExpiredDate, handleRetry };
};
