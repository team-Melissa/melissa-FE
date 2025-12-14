import { CircleButton } from '@/src/core/Button';
import { IconArrowRight } from '@/src/icons';
import styled from 'styled-components/native';

type Props = {
  direction: 'left' | 'right';
  disabled: boolean;
  onClick: () => void;
};

const CarouselButton = ({ direction, disabled, onClick }: Props) => {
  const IconArrow = direction === 'left' ? IconArrowLeft : IconArrowRight;
  const variant = disabled ? 'transparent' : 'secondary';

  return (
    <StyledCircleButton $direction={direction} size="medium" variant={variant} disabled={disabled} onPress={onClick}>
      <IconArrow />
    </StyledCircleButton>
  );
};

export default CarouselButton;

const StyledCircleButton = styled(CircleButton)<{ $direction: 'left' | 'right' }>`
  position: absolute;

  ${({ $direction }) => {
    if ($direction === 'left') return 'left: 15px';
    return 'right: 15px';
  }}
`;

const IconArrowLeft = styled(IconArrowRight)`
  transform: rotate(180deg);
`;
