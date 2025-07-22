import EditableChattingContainer from "@/src/features/chatting/containers/EditableChattingContainer";
import ReadOnlyChattingContainer from "@/src/features/chatting/containers/ReadOnlyChattingContainer";
import { useLocalSearchParams } from "expo-router";

type EditableParams = {
  aiProfileId: number;
};

type ReadOnlyParams = {
  year: number;
  month: number;
  day: number;
};

type Params = EditableParams | ReadOnlyParams;

const isEditable = (params: Params): params is EditableParams => "aiProfileId" in params;

const ChattingRouter = () => {
  const params = useLocalSearchParams() as unknown as Params;

  if (isEditable(params)) {
    const { aiProfileId } = params;
    return <EditableChattingContainer aiProfileId={aiProfileId} />;
  } else {
    const { year, month, day } = params;
    return <ReadOnlyChattingContainer year={year} month={month} day={day} />;
  }
};

export default ChattingRouter;
