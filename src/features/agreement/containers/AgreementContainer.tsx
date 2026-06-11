import { COLOR } from '@/src/constants/theme';
import { LargeTitle } from '@/src/core/Txt';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import AgreementListItem from '../components/AgreementListItem';
import { MOCK_AGREEMENT_STATUS } from '../mocks/mockData';

// TODO: 약관 Query API 연결
const AgreementContainer = () => {
  const { terms } = MOCK_AGREEMENT_STATUS;
  const initialAgreedMapState = Object.fromEntries(terms.map((term) => [term.termCode, term.agreed]));

  const [agreedMap, setAgreedMap] = useState<Record<string, boolean>>(initialAgreedMapState);

  const handleCheckedChange = (termCode: string) => {
    setAgreedMap((agreedMap) => ({ ...agreedMap, [termCode]: !agreedMap[termCode] }));
  };

  return (
    <SafeView>
      <LargeTitle color="title">약관 동의</LargeTitle>
      <List>
        {terms.map((term) => (
          <AgreementListItem
            key={term.termCode}
            term={term}
            isChecked={agreedMap[term.termCode]}
            onCheckedChange={() => handleCheckedChange(term.termCode)}
          />
        ))}
      </List>
    </SafeView>
  );
};

export default AgreementContainer;

const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLOR.background};
  padding: 0 18px;
  gap: 24px;
`;

const List = styled.View`
  width: 100%;
`;
