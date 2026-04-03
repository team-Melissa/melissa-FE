import { fireEvent, render, screen } from '@testing-library/react-native';
import DiaryHashtagInput from '../components/DiaryHashtagInput';

const TEST_ID = 'diary-hashtag-input';

describe('DiaryHashtagInput', () => {
  it('해시태그 입력 필드 렌더링 확인', () => {
    render(<DiaryHashtagInput value="" onValueChange={jest.fn()} />);

    expect(screen.getByTestId(TEST_ID)).toBeTruthy();
  });

  it('value 렌더링 확인', () => {
    const value = '태그';
    render(<DiaryHashtagInput value={value} onValueChange={jest.fn()} />);

    expect(screen.getByDisplayValue(value)).toBeTruthy();
  });

  it('placeholder 렌더링 확인', () => {
    const placeholder = '태그1';
    render(<DiaryHashtagInput value="" onValueChange={jest.fn()} placeholder={placeholder} />);

    expect(screen.getByPlaceholderText(placeholder)).toBeTruthy();
  });

  it('5자 이하 입력 시 onValueChange 호출 확인', () => {
    const changedValue = '테스트';
    const onValueChange = jest.fn();
    render(<DiaryHashtagInput value="" onValueChange={onValueChange} />);
    fireEvent.changeText(screen.getByTestId(TEST_ID), changedValue);

    expect(onValueChange).toHaveBeenCalledWith(changedValue);
  });

  it('5자 초과 시 onValueChange가 호출되지 않아야 함', () => {
    const onValueChange = jest.fn();
    render(<DiaryHashtagInput value="" onValueChange={onValueChange} />);
    fireEvent.changeText(screen.getByTestId(TEST_ID), '여섯여섯여섯');

    expect(onValueChange).not.toHaveBeenCalled();
  });
});
