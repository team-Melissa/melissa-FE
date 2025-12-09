import { LargeTitle } from '@/src/core/Txt';
import { IconArrowDown } from '@/src/icons/IconArrowDown';
import responsiveToPx from '@/src/utils/responsiveToPx';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

type Props = {
  onBackClick: () => void;
};

const SettingHeader = ({ onBackClick }: Props) => {
  return (
    <Wrapper>
      <TouchableOpacity onPress={onBackClick} hitSlop={5}>
        <StyledIconArrowLeft width={30} height={30} />
      </TouchableOpacity>
      <LargeTitle>설정</LargeTitle>
      <EmptyView />
    </Wrapper>
  );
};

export default SettingHeader;

const Wrapper = styled.View`
  flex-direction: row;
  width: 100%;
  padding: 15px 0;
  justify-content: space-between;
  margin-bottom: 50px;
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
