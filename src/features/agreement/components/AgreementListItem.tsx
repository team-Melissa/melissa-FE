import { Checkbox } from '@/src/core/Checkbox';
import { Body1, Description1 } from '@/src/core/Txt';
import { useModal } from '@/src/modules/modal';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import type { Term } from '../mocks/mockData';
import AgreementDetailModal from './AgreementDetailModal';

// TODO: term 타입 orval codegen으로 교체
type Props = {
  term: Term;
  isChecked: boolean;
  onCheckedChange: () => void;
};

const AgreementListItem = ({ term, isChecked, onCheckedChange }: Props) => {
  const { title, content, required } = term;

  const detailModal = useModal();

  const handleViewDetail = () => {
    detailModal.open(({ isOpen, exit }) => (
      <AgreementDetailModal isOpen={isOpen} title={title} content={content} onClose={exit} />
    ));
  };

  return (
    <Wrapper>
      <LabelView>
        <Checkbox checked={isChecked} onCheckedChange={onCheckedChange} />
        <Body1 color="title">{title}</Body1>
        <Body1 color={required ? 'error' : 'placeholder'}>({required ? '필수' : '선택'})</Body1>
      </LabelView>
      <TouchableOpacity onPress={handleViewDetail} hitSlop={5}>
        <StyledDescription1 color="sub1">보기</StyledDescription1>
      </TouchableOpacity>
    </Wrapper>
  );
};

export default AgreementListItem;

const Wrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
`;

const LabelView = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const StyledDescription1 = styled(Description1)`
  text-decoration-line: underline;
`;
