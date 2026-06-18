import type { AgreementStatusResponse, TermItemResponse } from '@/src/apis/_generated/serverAPI.schemas';

type CommonAgreementTerm = Required<
  Pick<
    TermItemResponse,
    | 'termCode'
    | 'title'
    | 'required'
    | 'currentTermVersionId'
    | 'currentVersion'
    | 'previousVersion'
    | 'agreed'
    | 'needsAgreement'
    | 'updated'
    | 'requiresReconsent'
    | 'blocking'
    | 'action'
  >
>;

export type AgreementStateTerm = CommonAgreementTerm & {
  contentUrl: string;
  content: null;
};

export type AgreementDetailTerm = CommonAgreementTerm & {
  contentUrl: null;
  content: string;
};

type CommonAgreement = Required<
  Pick<NonNullable<AgreementStatusResponse>, 'agreementRequired' | 'reason' | 'submitContext'>
>;

type AgreementState = CommonAgreement & {
  terms: AgreementStateTerm[];
};

type AgreementDetail = CommonAgreement & {
  terms: AgreementDetailTerm[];
};

export const isAgreementState = (result: AgreementStatusResponse | undefined): result is AgreementState => {
  return typeof result?.agreementRequired === 'boolean';
};

export const isAgreementDetail = (result: AgreementStatusResponse | undefined): result is AgreementDetail => {
  return !!result?.terms?.every((term) => typeof term.content === 'string');
};
