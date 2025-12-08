import DatePicker from 'react-native-date-picker';

type Props = {
  isOpen: boolean;
  onSubmit: (date: Date) => void;
  onCancel: () => void;
};

const TimePicker = ({ isOpen, onSubmit, onCancel }: Props) => {
  return (
    <DatePicker
      modal
      mode="time"
      minuteInterval={10}
      title={null}
      confirmText="확인"
      cancelText="취소"
      date={new Date()}
      open={isOpen}
      onCancel={onCancel}
      onConfirm={onSubmit}
    />
  );
};

export default TimePicker;
