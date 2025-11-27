import styled from "styled-components/native";
import { ModalRoot, type ModalProps } from "@/src/modules/modal";
import responsiveToPx from "@/src/utils/responsiveToPx";
import { theme } from "@/src/constants/theme";

type Props = ModalProps;

/**
 * @deprecated 1.3.0 이후 제거 예정
 * //TODO: 삭제 예정
 */
const NoticeModal = ({ isOpen, close, exit }: Props) => {
  const handleConfirm = () => {
    exit();
  };

  return (
    <ModalRoot isOpen={isOpen} onClose={close}>
      <Wrapper>
        <Title>[공지]{"\n"}멜리사 서비스 데이터 초기화 안내 (11/29까지 백업 부탁드려요)</Title>
        <ContentScrollView>
          <Content>
            멜리사가 더 안정적인 모습으로 새단장을 준비하면서 기존 기록을 계속 유지하기 어려워졌어요. (11/30부터
            리모델링 공사 예정)
            {"\n"}
            {"\n"}
            저희도 멜리사의 작은 기록 하나하나가 애틋한데, 더 나은 서비스를 위한 과정에서 이런 안내를 드리게 되어 정말
            마음이 무겁습니다.{"\n"}
            {"\n"}
            이에 소중한 내용이 있다면 11월 29일까지 캡쳐하여 꼭 백업 부탁드리고, 관련하여 도움이 필요하신 점이나 궁금한
            점은 언제든지 teammelissa7@gmail.com 으로 알려주세요.{"\n"}
            {"\n"}
            감사합니다.
          </Content>
        </ContentScrollView>
        <ConfirmButton onPress={handleConfirm}>
          <ConfirmButtonText>확인</ConfirmButtonText>
        </ConfirmButton>
      </Wrapper>
    </ModalRoot>
  );
};

export default NoticeModal;

const Wrapper = styled.View`
  width: 90%;
  max-height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.white};
  padding: ${responsiveToPx("30px")};
  gap: ${theme.gap.lg};
  border-radius: ${theme.borderRadius.lg};
`;

const Title = styled.Text`
  font-family: ${theme.fontFamily.nsExtraBold};
  font-size: ${theme.fontSize.lg};
  color: ${theme.colors.black};
  text-align: center;
  line-height: ${responsiveToPx("24px")};
`;

const ContentScrollView = styled.ScrollView`
  width: 100%;
  max-height: ${responsiveToPx("600px")};
`;

const Content = styled.Text`
  font-family: ${theme.fontFamily.nsRegular};
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.black};
  line-height: ${responsiveToPx("22px")};
`;

const ConfirmButton = styled.TouchableOpacity`
  width: 100%;
  height: ${responsiveToPx("45px")};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.deepGreen};
  border-radius: ${theme.borderRadius.sm};
`;

const ConfirmButtonText = styled.Text`
  font-family: ${theme.fontFamily.nsBold};
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.white};
`;
