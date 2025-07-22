import { useCallback, useEffect, useState } from "react";
import { TThreadDate } from "../types/chattingTypes";
import { useSleepTimeQuery } from "../hooks/queries/useSleepTimeQuery";
import { useMakeThreadMutation } from "../hooks/mutations/useMakeThreadMutation";
import { getThreadDateExpired } from "../utils/time";
import ChattingContainer from "./ChattingContainer";
import { useChangeAiProfileMutation } from "../hooks/mutations/useChangeAiProfileMutation";

type Props = {
  aiProfileId: number;
};

const EditableChattingContainer = ({ aiProfileId }: Props) => {
  const [threadDate, setThreadDate] = useState<TThreadDate | null>(null);
  const [threadExpiredDate, setThreadExpiredDate] = useState<Date | null>(null);

  const { data: sleepTime } = useSleepTimeQuery();

  const { mutate: makeThreadMutate } = useMakeThreadMutation();
  const { mutate: changeAiMutate } = useChangeAiProfileMutation();

  const enterChattingRoomMutate = useCallback(
    (aiProfileId: number, year: number, month: number, day: number) => {
      makeThreadMutate(
        { aiProfileId, year, month, day },
        { onSuccess: () => changeAiMutate({ aiProfileId, year, month, day }) }
      );
    },
    [changeAiMutate, makeThreadMutate]
  );

  useEffect(() => {
    if (!sleepTime) return;

    const sleepHour = parseInt(sleepTime.slice(0, 2));
    const [{ year, month, day }, expiredDate] = getThreadDateExpired(sleepHour);
    setThreadDate({ year, month, day });
    setThreadExpiredDate(expiredDate);
    enterChattingRoomMutate(aiProfileId, year, month, day);
  }, [aiProfileId, sleepTime, enterChattingRoomMutate]);

  if (!threadDate || !threadExpiredDate) return null;

  return <ChattingContainer threadDate={threadDate} threadExpiredDate={threadExpiredDate} />;
};

export default EditableChattingContainer;
