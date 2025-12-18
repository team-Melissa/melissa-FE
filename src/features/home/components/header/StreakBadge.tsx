import { COLOR } from '@/src/constants/theme';
import { Label } from '@/src/core/Txt';
import { IconCharacter } from '@/src/icons';
import styled from 'styled-components/native';

const StreakBadge = () => {
  //TODO: 스트릭 수 API 요청해서 응답 받아오기
  const data = 0;

  return (
    <Wrapper>
      <StyledIconCharacter />
      <Label color="title">{data.toLocaleString()}</Label>
    </Wrapper>
  );
};

export default StreakBadge;

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 30px;
  padding: 5px 10px 5px 0;
  border-radius: 99px;
  background-color: ${COLOR.white};
  overflow: visible;
`;

const StyledIconCharacter = styled(IconCharacter)`
  right: 5px;
  top: -1px;
  align-items: center;
  align-self: center;
  overflow: visible;
`;
