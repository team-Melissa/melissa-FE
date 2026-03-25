import { COLOR, FONT_FAMILY } from '@/src/constants/theme';
import { ModalRoot } from '@/src/modules/modal';
import styled from 'styled-components/native';

type Props = {
  isOpen: boolean;
  isPending: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteDiaryConfirmModal = ({ isOpen, isPending, onConfirm, onClose }: Props) => {
  return (
    <ModalRoot isOpen={isOpen} onClose={onClose}>
      <ModalWrapper>
        <Title>일기를 삭제할까요?</Title>
        <Description>삭제된 일기는 복구할 수 없습니다.</Description>
        <ButtonWrapper>
          <CancelButton onPress={onClose} disabled={isPending}>
            <CancelButtonText>취소</CancelButtonText>
          </CancelButton>
          <ConfirmButton onPress={onConfirm} disabled={isPending}>
            <ConfirmButtonText>{isPending ? '삭제 중...' : '삭제'}</ConfirmButtonText>
          </ConfirmButton>
        </ButtonWrapper>
      </ModalWrapper>
    </ModalRoot>
  );
};

export default DeleteDiaryConfirmModal;

const ModalWrapper = styled.View`
  width: 280px;
  padding: 24px 20px;
  background-color: ${COLOR.white};
  border-radius: 16px;
  align-items: center;
`;

const Title = styled.Text`
  font-family: ${FONT_FAMILY.pretendard600};
  font-size: 18px;
  color: ${COLOR.title};
  margin-bottom: 8px;
`;

const Description = styled.Text`
  font-family: ${FONT_FAMILY.pretendard400};
  font-size: 14px;
  color: ${COLOR.sub1};
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const CancelButton = styled.TouchableOpacity`
  flex: 1;
  padding: 12px 0;
  background-color: ${COLOR.background};
  border-radius: 8px;
  align-items: center;
`;

const CancelButtonText = styled.Text`
  font-family: ${FONT_FAMILY.pretendard500};
  font-size: 14px;
  color: ${COLOR.sub1};
`;

const ConfirmButton = styled.TouchableOpacity`
  flex: 1;
  padding: 12px 0;
  background-color: ${COLOR.error};
  border-radius: 8px;
  align-items: center;
`;

const ConfirmButtonText = styled.Text`
  font-family: ${FONT_FAMILY.pretendard500};
  font-size: 14px;
  color: ${COLOR.white};
`;
