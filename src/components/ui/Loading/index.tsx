import { ActivityIndicator } from 'react-native';
import * as S from './styles';

/**
 * @deprecated core/loading을 사용해주세요
 */
function Loading() {
  return (
    <S.CenterView>
      <ActivityIndicator size="large" />
    </S.CenterView>
  );
}

export default Loading;
