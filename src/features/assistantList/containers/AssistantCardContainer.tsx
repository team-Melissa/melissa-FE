import AssistantCard from "../components/AssistantCard";
import type { TAssistantProfile } from "../types/assistantListTypes";

type AssistantCardContainerProps = {
  item: TAssistantProfile;
};

export default function AssistantCardContainer({ item }: AssistantCardContainerProps) {
  return <AssistantCard item={item} onPressAiCard={() => {}} />;
}
