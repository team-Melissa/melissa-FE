import { IconArrowDown } from '@/src/icons';
import characters, { type CharacterId } from '@/src/modules/character';
import responsiveToPx from '@/src/utils/responsiveToPx';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

type Props = {
  characterId: CharacterId;
  onBackClick: () => void;
};

const ChatHeader = ({ characterId, onBackClick }: Props) => {
  const { bust: Bust } = characters[characterId];

  return (
    <Wrapper>
      <TouchableOpacity onPress={onBackClick} hitSlop={5}>
        <StyledIconArrowLeft width={30} height={30} />
      </TouchableOpacity>
      <Bust />
      <EmptyView />
    </Wrapper>
  );
};

export default ChatHeader;

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 15px 0;
  margin-bottom: 20px;
`;

const StyledIconArrowLeft = styled(IconArrowDown)`
  width: ${responsiveToPx('30px')};
  height: ${responsiveToPx('30px')};
  transform: rotate(90deg);
`;

const EmptyView = styled.View`
  width: ${responsiveToPx('30px')};
  height: ${responsiveToPx('30px')};
`;
