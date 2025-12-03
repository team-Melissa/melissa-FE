import { Description3 } from '@/src/core/Txt';
import { useState } from 'react';
import type { TextProps } from 'react-native-svg';

const CopyrightTxt = (props: Omit<TextProps, 'color'>) => {
  const [year] = useState<number>(new Date().getFullYear());

  return (
    <Description3 color="title" {...props}>
      © {year} Melissa. All rights reserved.
    </Description3>
  );
};

export default CopyrightTxt;
