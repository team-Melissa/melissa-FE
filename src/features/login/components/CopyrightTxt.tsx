import { Description3 } from '@/src/core/Txt';
import { useState } from 'react';
import type { TextProps } from 'react-native';

const CopyrightTxt = (props: TextProps) => {
  const [year] = useState<number>(new Date().getFullYear());

  return (
    <Description3 color="title" {...props}>
      © {year} Melissa. All rights reserved.
    </Description3>
  );
};

export default CopyrightTxt;
