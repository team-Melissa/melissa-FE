import type { AgreementDecisionRequest } from '@/src/apis/_generated/serverAPI.schemas';
import { CommonLoading } from '@/src/core/Loading';
import AgreementList from '../components/AgreementList';
import { useAgreementsSubmitMutation } from '../hooks/useAgreementsSubmitMutation';
import { useGetAgreementDetail } from '../hooks/useGetAgreementDetail';

const AgreementContainer = () => {
  const { data: agreementDetail } = useGetAgreementDetail();

  const submitAgreementsMutation = useAgreementsSubmitMutation();

  const handleAgreementsSubmit = (agreements: AgreementDecisionRequest[]) => {
    if (!agreementDetail) return;
    if (submitAgreementsMutation.isPending) return;

    const context = agreementDetail.submitContext;
    submitAgreementsMutation.mutate({ data: { context, agreements } });
  };

  if (!agreementDetail) return <CommonLoading />;

  return <AgreementList terms={agreementDetail.terms} onSubmit={handleAgreementsSubmit} />;
};

export default AgreementContainer;
