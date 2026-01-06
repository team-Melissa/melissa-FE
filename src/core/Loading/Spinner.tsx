import { ActivityIndicator } from 'react-native';

type Props = {
  size?: number;
  color?: string;
};

const Spinner = ({ size = 20, color = '#999' }: Props) => {
  const scale = size / 20;

  return <ActivityIndicator color={color} style={{ transform: [{ scale }] }} />;
};

export default Spinner;
