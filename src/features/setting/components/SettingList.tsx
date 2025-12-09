import type { UserSettingResponse } from '@/src/apis/_generated/serverAPI.schemas';
import { Switch } from '@/src/core/Switch';
import { MiddleTitle } from '@/src/core/Txt';
import { useDisclosure } from '@/src/hooks/useDisclosure';
import { IconArrowDown } from '@/src/icons/IconArrowDown';
import { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import SettingItem from './SettingItem';
import TimePicker from './TimePicker';

type SettingData = NonNullable<UserSettingResponse>;
type TimePickerMode = Exclude<keyof NonNullable<UserSettingResponse>, 'notificationEnabled'> | null;

type Props = {
  settingData: SettingData;
  onNotificationToggle: (notificationEnabled: boolean) => void;
  onSleepTimeChange: (sleepTime: string) => void;
  onNotificationTimeChange: (notificationTime: string) => void;
};

const SettingList = ({ settingData, onNotificationToggle, onSleepTimeChange, onNotificationTimeChange }: Props) => {
  const [timePickerMode, setTimePickerMode] = useState<TimePickerMode>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleNotificationToggle = (notificationEnabled: boolean) => {
    onNotificationToggle(notificationEnabled);
  };

  const handleSleepTimePickerOpen = () => {
    setTimePickerMode('sleepTime');
    onOpen();
  };

  const handleNotificationTimePickerOpen = () => {
    setTimePickerMode('notificationTime');
    onOpen();
  };

  const handleTimePickerClose = () => {
    setTimePickerMode(null);
    onClose();
  };

  const handleTimePickerSubmit = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;

    if (timePickerMode === 'notificationTime') {
      onNotificationTimeChange(time);
    } else if (timePickerMode === 'sleepTime') {
      onSleepTimeChange(time);
    }

    handleTimePickerClose();
  };

  const handleFeedbackClick = () => {
    Alert.alert('준비중인 기능입니다.');
  };

  return (
    <Wrapper>
      <SettingItem title="푸시 알림" description="푸시 알림을 허용/차단할 수 있어요.">
        <Switch checked={settingData.notificationEnabled} onCheckedChange={handleNotificationToggle} />
      </SettingItem>
      <SettingItem title="일기 자동 작성 시간" description="정리 안된 일기를 이 시간에 작성해드려요.">
        <StyledButton onPress={handleSleepTimePickerOpen} hitSlop={5}>
          <MiddleTitle color="title">{settingData.sleepTime}</MiddleTitle>
          <StyledIconArrowRight />
        </StyledButton>
      </SettingItem>
      <SettingItem title="알람 시간" description={'원하는 시간에 대화할 수 있도록\n앱 푸쉬 알림을 보내드려요.'}>
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
      <TimePicker isOpen={isOpen} onSubmit={handleTimePickerSubmit} onCancel={handleTimePickerClose} />
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
