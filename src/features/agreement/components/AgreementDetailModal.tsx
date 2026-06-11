import { COLOR } from '@/src/constants/theme';
import { Body2, MiddleTitle } from '@/src/core/Txt';
import { ModalRoot } from '@/src/modules/modal';
import styled from 'styled-components/native';

type Props = {
  isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
};

const AgreementDetailModal = ({ isOpen, title, content, onClose }: Props) => {
  return (
    <ModalRoot isOpen={isOpen} onClose={onClose}>
      <Wrapper>
        <MiddleTitle color="title">{title}</MiddleTitle>
        <ContentScroll>
          <Body2 color="sub1">{content}</Body2>
        </ContentScroll>
      </Wrapper>
    </ModalRoot>
  );
};

export default AgreementDetailModal;

const Wrapper = styled.View`
  width: 85%;
  max-height: 70%;
  background-color: ${COLOR.white};
  padding: 24px;
  border-radius: 30px;
  gap: 16px;
`;

const ContentScroll = styled.ScrollView`
  flex-grow: 0;
`;
