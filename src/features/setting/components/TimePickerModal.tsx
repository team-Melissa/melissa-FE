import { COLOR } from '@/src/constants/theme';
import { ModalRoot } from '@/src/modules/modal';
import responsiveToPx from '@/src/utils/responsiveToPx';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import styled from 'styled-components/native';

type Props = {
  isOpen: boolean;
  initialTime: string;
  onClose: () => void;
  onSubmit: (time: string) => void;
};

const getInitialDate = (initialTime: string) => {
  const [hours, minutes] = initialTime.split(':');
  const date = new Date();
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  return date;
};

const TimePickerModal = ({ isOpen, initialTime, onClose, onSubmit }: Props) => {
  const [date, setDate] = useState<Date>(getInitialDate(initialTime));

  const handleModalClose = () => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;
    onSubmit(time);
    onClose();
  };

  return (
    <ModalRoot isOpen={isOpen} onClose={handleModalClose}>
      <Wrapper>
        <DatePicker theme="light" date={date} onDateChange={setDate} mode="time" minuteInterval={10} />
      </Wrapper>
    </ModalRoot>
  );
};

export default TimePickerModal;

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.white};
  padding: ${responsiveToPx('20px')};
  border-radius: 30px;
`;
