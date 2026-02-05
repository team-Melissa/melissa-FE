import { COLOR } from '@/src/constants/theme';
import { PrimaryButton } from '@/src/core/Button';
import { Body2 } from '@/src/core/Txt';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import EmailInput from '../components/EmailInput';
import FeedbackHeader from '../components/FeedbackHeader';
import FeedbackTextarea from '../components/FeedbackTextarea';
import { useSendEmailMutation } from '../hooks/useSendEmailMutation';
import { useUserEmailState } from '../hooks/useUserEmailState';
import { isValidEmail } from '../utils/validation';

const FeedbackContainer = () => {
  const router = useRouter();
  const [message, setMessage] = useState<string>('');
  const [email, setEmail] = useUserEmailState('');

  const sendEmailMutation = useSendEmailMutation();

  const isFormValid = message.trim() && email.trim() && isValidEmail(email);

  const handleBackClick = () => {
    router.back();
  };

  const handleSubmit = async () => {
    if (sendEmailMutation.isPending) return;
    sendEmailMutation.mutate(
      { message, email },
      {
        onSuccess: () => {
          setMessage('');
          setEmail('');
        },
      }
    );
  };

  return (
    <SafeView>
      <FeedbackHeader onBackClick={handleBackClick} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ContentWrapper>
          <FormSection>
            <Body2 color="title">남겨주시고 싶은 의견을 작성해주세요</Body2>
            <FeedbackTextarea value={message} onValueChange={setMessage} />
          </FormSection>
          <FormSection>
            <Body2 color="title">진행 상황을 공유받을 수 있는 이메일</Body2>
            <EmailInput value={email} onValueChange={setEmail} />
          </FormSection>
        </ContentWrapper>
      </TouchableWithoutFeedback>
      <ButtonWrapper>
        <PrimaryButton size="large" disabled={sendEmailMutation.isPending || !isFormValid} onPress={handleSubmit}>
          제출하기
        </PrimaryButton>
      </ButtonWrapper>
    </SafeView>
  );
};

export default FeedbackContainer;

const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLOR.background};
  padding: 0 18px;
`;

const ContentWrapper = styled.View`
  flex: 1;
  gap: 36px;
`;

const FormSection = styled.View`
  gap: 12px;
`;

const ButtonWrapper = styled.View`
  margin: 0 auto;
`;
