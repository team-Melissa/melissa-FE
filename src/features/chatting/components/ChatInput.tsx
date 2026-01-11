import { COLOR, FONT_FAMILY } from '@/src/constants/theme';
import { CircleButton } from '@/src/core/Button';
import Spinner from '@/src/core/Loading/Spinner';
import { IconSend, IconWave } from '@/src/icons';
import responsiveToPx from '@/src/utils/responsiveToPx';
import { useState } from 'react';
import styled from 'styled-components/native';

type Props = {
  isLoading: boolean;
  onInputSubmit: (input: string) => void;
  onVoiceModeClick: () => void;
};

const ChatInput = ({ isLoading, onInputSubmit, onVoiceModeClick }: Props) => {
  const [input, setInput] = useState<string>('');

  const handleInputSubmit = () => {
    if (isLoading) return;
    const trimmedInput = input.trim();
    if (!trimmedInput) return;
    onInputSubmit(trimmedInput);
    setInput('');
  };

  return (
    <Wrapper>
      <InputWrapper>
        <StyledInput
          value={input}
          onChangeText={setInput}
          multiline
          placeholder="오늘 하루에 대해 말해주세요."
          placeholderTextColor={COLOR.placeholder}
        />
        <SendButton size="small" variant="primary" disabled={isLoading} onPress={handleInputSubmit}>
          {isLoading ? <Spinner size={17} /> : <IconSend />}
        </SendButton>
      </InputWrapper>
      <CircleButton size="small" variant="secondary" onPress={onVoiceModeClick}>
        <IconWave />
      </CircleButton>
    </Wrapper>
  );
};

export default ChatInput;

const Wrapper = styled.View`
  flex-direction: row;
  width: 100%;
  height: ${responsiveToPx('72px')};
  align-items: center;
  gap: 8px;
  padding: 10px 0;
`;

const InputWrapper = styled.View`
  flex: 1;
  position: relative;
  justify-content: center;
`;

const StyledInput = styled.TextInput`
  flex: 1;
  border-radius: 99px;
  padding: 10px 60px 10px 20px;
  background-color: ${COLOR.white};
  font-family: ${FONT_FAMILY.pretendard500};
  font-size: 15px;
  color: ${COLOR.title};
`;

const SendButton = styled(CircleButton)`
  position: absolute;
  right: 3px;
`;
