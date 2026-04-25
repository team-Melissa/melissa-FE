import { PrimaryButton } from '@/src/core/Button';
import Spinner from '@/src/core/Loading/Spinner';
import { IconCheck } from '@/src/icons';

type Props = {
  isLoading: boolean;
  isExpanded: boolean;
  onClick: () => void;
};

export const GenerateDiaryButton = ({ isLoading, isExpanded, onClick }: Props) => {
  return (
    <PrimaryButton
      size={isExpanded ? 'small' : 'circle'}
      icon={isLoading ? <Spinner size={20} /> : <IconCheck />}
      disabled={isLoading}
      onPress={onClick}
    >
      {isExpanded && '일기 쓰기'}
    </PrimaryButton>
  );
};
