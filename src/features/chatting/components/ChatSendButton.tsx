import { CircleButton } from '@/src/core/Button';
import Spinner from '@/src/core/Loading/Spinner';
import { IconSend } from '@/src/icons';

type Props = {
  isLoading: boolean;
  onClick: () => void;
};

export const ChatSendButton = ({ isLoading, onClick }: Props) => {
  return (
    <CircleButton size="small" variant="primary" disabled={isLoading} onPress={onClick}>
      {isLoading ? <Spinner size={17} /> : <IconSend />}
    </CircleButton>
  );
};
