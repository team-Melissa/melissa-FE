import { COLOR } from '@/src/constants/theme';
import { PrimaryButton } from '@/src/core/Button';
import { LargeTitle } from '@/src/core/Txt';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import AgreementAllCheck from '../components/AgreementAllCheck';
import AgreementListItem from '../components/AgreementListItem';
import { MOCK_AGREEMENT_STATUS } from '../mocks/mockData';

// TODO: 약관 Query API 연결
const AgreementContainer = () => {
  const { terms } = MOCK_AGREEMENT_STATUS;

  const [agreedMap, setAgreedMap] = useState<Record<string, boolean>>(() => {
    return Object.fromEntries(terms.map((term) => [term.termCode, term.agreed]));
  });

  const isAllAgreed = terms.every((term) => agreedMap[term.termCode]);
  const isRequiredAllAgreed = terms.filter((term) => term.required).every((term) => agreedMap[term.termCode]);

  const handleCheckedChange = (termCode: string) => {
    setAgreedMap((agreedMap) => ({
      ...agreedMap,
      [termCode]: !agreedMap[termCode],
    }));
  };

  const handleAllCheckedChange = () => {
    const nextCheckedValue = !isAllAgreed;
    setAgreedMap(Object.fromEntries(terms.map((term) => [term.termCode, nextCheckedValue])));
  };

  return (
    <SafeView>
      <LargeTitle color="title">약관 동의</LargeTitle>
      <AgreementAllCheck checked={isAllAgreed} onCheckedChange={handleAllCheckedChange} />
      <Divider />
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
      <Footer>
        <PrimaryButton disabled={!isRequiredAllAgreed} style={{ opacity: isRequiredAllAgreed ? 1 : 0.5 }}>
          확인
        </PrimaryButton>
      </Footer>
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

const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${COLOR.placeholder};
`;

const List = styled.View`
  width: 100%;
`;

const Footer = styled.View`
  margin-top: auto;
  align-items: center;
  padding-bottom: 12px;
`;
