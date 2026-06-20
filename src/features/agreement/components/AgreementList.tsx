import type { AgreementDecisionRequest, TermItemResponse } from '@/src/apis/_generated/serverAPI.schemas';
import { COLOR } from '@/src/constants/theme';
import { PrimaryButton } from '@/src/core/Button';
import { LargeTitle } from '@/src/core/Txt';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import AgreementAllCheck from './AgreementAllCheck';
import AgreementListItem from './AgreementListItem';

type Props = {
  terms: TermItemResponse[];
  onSubmit: (agreements: AgreementDecisionRequest[]) => void;
};

const AgreementList = ({ terms: initialTerms, onSubmit }: Props) => {
  const [terms, setTerms] = useState<TermItemResponse[]>(initialTerms);

  const isAllAgreed = terms.every((term) => term.agreed);
  const isRequiredAllAgreed = terms.every((term) => !term.required || term.agreed);

  const handleCheckedChange = (termCode: string) => {
    setTerms((prevTerms) => {
      const newTerms = prevTerms.map((term) => (term.termCode === termCode ? { ...term, agreed: !term.agreed } : term));
      return newTerms;
    });
  };

  const handleAllCheckedChange = () => {
    setTerms((prevTerms) => prevTerms.map((term) => ({ ...term, agreed: !isAllAgreed })));
  };

  const handleAgreementsSubmit = () => {
    const agreements = terms.map((term) => ({
      termVersionId: term.currentTermVersionId,
      agreed: term.agreed,
    }));
    onSubmit(agreements);
  };

  useEffect(() => {
    setTerms(initialTerms);
  }, [initialTerms]);

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
            isChecked={term.agreed}
            onCheckedChange={() => handleCheckedChange(term.termCode)}
          />
        ))}
      </List>
      <Footer>
        <PrimaryButton
          onPress={handleAgreementsSubmit}
          disabled={!isRequiredAllAgreed}
          style={{ opacity: isRequiredAllAgreed ? 1 : 0.5 }}
        >
          확인
        </PrimaryButton>
      </Footer>
    </SafeView>
  );
};

export default AgreementList;

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
