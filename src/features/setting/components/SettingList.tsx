import type { UserSettingResponse } from '@/src/apis/_generated/serverAPI.schemas';
import { Switch } from '@/src/core/Switch';
import { MiddleTitle } from '@/src/core/Txt';
import { IconArrowDown } from '@/src/icons';
import { useModal } from '@/src/modules/modal';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import SettingItem from './SettingItem';
import TimePickerModal from './TimePickerModal';

type SettingData = NonNullable<UserSettingResponse>;

type Props = {
  settingData: SettingData;
  onNotificationToggle: (notificationEnabled: boolean) => void;
  onSleepTimeChange: (sleepTime: string) => void;
  onNotificationTimeChange: (notificationTime: string) => void;
};

const SettingList = ({ settingData, onNotificationToggle, onSleepTimeChange, onNotificationTimeChange }: Props) => {
  const timePickerModal = useModal();

  const handleSleepTimePickerOpen = () => {
    timePickerModal.open(({ isOpen, exit }) => (
      <TimePickerModal
        isOpen={isOpen}
        onClose={exit}
        initialTime={settingData.sleepTime}
        onSubmit={onSleepTimeChange}
      />
    ));
  };

  const handleNotificationTimePickerOpen = () => {
    timePickerModal.open(({ isOpen, exit }) => (
      <TimePickerModal
        isOpen={isOpen}
        onClose={exit}
        initialTime={settingData.notificationTime}
        onSubmit={onNotificationTimeChange}
      />
    ));
  };

  const handleFeedbackClick = () => {
    Alert.alert('준비중인 기능입니다.');
  };

  return (
    <Wrapper>
      <SettingItem title="푸시 알림" description="푸시 알림을 허용/차단할 수 있어요.">
        <Switch checked={settingData.notificationEnabled} onCheckedChange={onNotificationToggle} />
      </SettingItem>
      <SettingItem title="일기 자동 작성 시간" description="정리 안된 일기를 이 시간에 작성해드려요.">
        <StyledButton onPress={handleSleepTimePickerOpen} hitSlop={5}>
          <MiddleTitle color="title">{settingData.sleepTime}</MiddleTitle>
          <StyledIconArrowRight />
        </StyledButton>
      </SettingItem>
      <SettingItem title="알람 시간" description={'원하는 시간에 대화할 수 있도록\n앱 푸시 알림을 보내드려요.'}>
        <StyledButton onPress={handleNotificationTimePickerOpen} hitSlop={5}>
          <MiddleTitle color="title">{settingData.notificationTime}</MiddleTitle>
          <StyledIconArrowRight />
        </StyledButton>
      </SettingItem>
      <SettingItem title="의견 보내기" description="운영진에게 앱에 대한 의견을 전달해주세요.">
        <StyledButton onPress={handleFeedbackClick} hitSlop={5}>
          <StyledIconArrowRight />
        </StyledButton>
      </SettingItem>
    </Wrapper>
  );
};

export default SettingList;

const Wrapper = styled.View`
  width: 100%;
  gap: 10px;
`;

const StyledButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const StyledIconArrowRight = styled(IconArrowDown)`
  width: 20px;
  height: 20px;
  transform: rotate(-90deg);
`;
