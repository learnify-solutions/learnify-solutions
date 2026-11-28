import {
  CheatSheetSection,
  ExamPrepResource,
  InterviewQaItem,
  PracticeQuestion,
} from '../types';
import {
  EXAM_PREP_META,
  getRelatedExamPrepResources,
  parseExamPrepRoutePath as parseExamPrepMetaRoutePath,
} from './examPrepMeta';
import {
  SECURITY_PLUS_SY0_701_QUESTIONS,
  AZURE_AZ_104_QUESTIONS,
  AWS_SAA_C03_QUESTIONS,
} from './examPrepQuestions';
import {
  POWER_BI_PL_300_QUESTIONS,
  NETWORK_PLUS_N10_009_QUESTIONS,
  AZURE_AI_102_QUESTIONS,
} from './examPrepQuestions2';
import {
  NETWORK_PORTS_CHEAT_SHEET,
  KUBECTL_CKA_CHEAT_SHEET,
  AZURE_VS_AWS_CHEAT_SHEET,
  AZURE_INTERVIEW_QA,
  SECURITY_SOC_INTERVIEW_QA,
  POWER_BI_INTERVIEW_QA,
  AWS_INTERVIEW_QA,
  CALCULATOR_REGIONS,
  CALCULATOR_COURSES,
} from './examPrepResources';
import {
  AZURE_AZ_900_QUESTIONS,
  AWS_CLF_C02_QUESTIONS,
  CISCO_CCNA_200_301_QUESTIONS,
  MICROSOFT_SC_900_QUESTIONS,
  ISC2_CISSP_QUESTIONS,
  KUBERNETES_CKA_QUESTIONS,
  TERRAFORM_ASSOC_QUESTIONS,
  GCP_ACE_QUESTIONS,
  LINUX_PLUS_QUESTIONS,
} from './examPrepQuestions3';
import {
  IPV4_SUBNETTING_CIDR_CHEAT_SHEET,
  LINUX_NETWORKING_CHEAT_SHEET,
  TERRAFORM_IAC_CHEAT_SHEET,
  POWER_BI_PL_300_DAX_CHEAT_SHEET,
  AZURE_AZ_104_LAB_CLI_CHEAT_SHEET,
  ENTERPRISE_ROUTING_SWITCHING_SECURITY_CLI_CHEAT_SHEET,
  CISCO_NETWORK_INTERVIEW_QA,
} from './examPrepResources2';
import {
  CISCO_ENCOR_350_401_QUESTIONS,
  CISCO_ENARSI_SDWAN_QUESTIONS,
  CISCO_SCOR_ISE_CYBEROPS_QUESTIONS,
} from './examPrepQuestionsCisco';
import {
  COMPTIA_ITF_PLUS_QUESTIONS,
  AZURE_DP_900_QUESTIONS,
  POWER_PLATFORM_PL_900_QUESTIONS,
  CLOUD_ESSENTIALS_CLO_002_QUESTIONS,
  COPILOT_MS_4018_QUESTIONS,
} from './examPrepQuestionsExt7';
import {
  AZURE_DP_100_QUESTIONS,
  COMPTIA_A_PLUS_QUESTIONS,
  COMPTIA_SERVER_PLUS_QUESTIONS,
} from './examPrepQuestionsExt8';

export { CALCULATOR_REGIONS, CALCULATOR_COURSES, getRelatedExamPrepResources };

type ExamPrepPayload = {
  questions?: PracticeQuestion[];
  cheatSheetSections?: CheatSheetSection[];
  interviewItems?: InterviewQaItem[];
};

const EXAM_PREP_PAYLOAD_BY_SLUG: Record<string, ExamPrepPayload> = {
  'comptia-security-plus-sy0-701-practice-questions': {
    questions: SECURITY_PLUS_SY0_701_QUESTIONS,
  },
  'azure-az-104-practice-questions': {
    questions: AZURE_AZ_104_QUESTIONS,
  },
  'aws-saa-c03-practice-questions': {
    questions: AWS_SAA_C03_QUESTIONS,
  },
  'power-bi-pl-300-practice-questions': {
    questions: POWER_BI_PL_300_QUESTIONS,
  },
  'comptia-network-plus-n10-009-practice-questions': {
    questions: NETWORK_PLUS_N10_009_QUESTIONS,
  },
  'azure-ai-102-practice-questions': {
    questions: AZURE_AI_102_QUESTIONS,
  },
  'comptia-network-plus-port-numbers-cheat-sheet': {
    cheatSheetSections: NETWORK_PORTS_CHEAT_SHEET,
  },
  'kubernetes-cka-kubectl-commands-cheat-sheet': {
    cheatSheetSections: KUBECTL_CKA_CHEAT_SHEET,
  },
  'azure-vs-aws-services-mapping-sheet': {
    cheatSheetSections: AZURE_VS_AWS_CHEAT_SHEET,
  },
  'azure-administrator-interview-questions': {
    interviewItems: AZURE_INTERVIEW_QA,
  },
  'comptia-security-soc-interview-questions': {
    interviewItems: SECURITY_SOC_INTERVIEW_QA,
  },
  'power-bi-data-analyst-interview-questions': {
    interviewItems: POWER_BI_INTERVIEW_QA,
  },
  'aws-solutions-architect-interview-questions': {
    interviewItems: AWS_INTERVIEW_QA,
  },
  'azure-az-900-practice-questions': {
    questions: AZURE_AZ_900_QUESTIONS,
  },
  'aws-clf-c02-practice-questions': {
    questions: AWS_CLF_C02_QUESTIONS,
  },
  'cisco-ccna-200-301-practice-questions': {
    questions: CISCO_CCNA_200_301_QUESTIONS,
  },
  'microsoft-sc-900-practice-questions': {
    questions: MICROSOFT_SC_900_QUESTIONS,
  },
  'isc2-cissp-practice-questions': {
    questions: ISC2_CISSP_QUESTIONS,
  },
  'kubernetes-cka-practice-questions': {
    questions: KUBERNETES_CKA_QUESTIONS,
  },
  'terraform-associate-003-practice-questions': {
    questions: TERRAFORM_ASSOC_QUESTIONS,
  },
  'gcp-associate-cloud-engineer-practice-questions': {
    questions: GCP_ACE_QUESTIONS,
  },
  'comptia-linux-plus-xk0-005-practice-questions': {
    questions: LINUX_PLUS_QUESTIONS,
  },
  'ipv4-subnetting-cidr-cheat-sheet-calculator': {
    cheatSheetSections: IPV4_SUBNETTING_CIDR_CHEAT_SHEET,
  },
  'linux-networking-commands-cheat-sheet': {
    cheatSheetSections: LINUX_NETWORKING_CHEAT_SHEET,
  },
  'terraform-iac-commands-cheat-sheet': {
    cheatSheetSections: TERRAFORM_IAC_CHEAT_SHEET,
  },
  'comptia-itf-plus-fc0-u61-practice-questions': {
    questions: COMPTIA_ITF_PLUS_QUESTIONS,
  },
  'azure-dp-900-practice-questions': {
    questions: AZURE_DP_900_QUESTIONS,
  },
  'power-platform-pl-900-practice-questions': {
    questions: POWER_PLATFORM_PL_900_QUESTIONS,
  },
  'comptia-cloud-essentials-clo-002-practice-questions': {
    questions: CLOUD_ESSENTIALS_CLO_002_QUESTIONS,
  },
  'microsoft-copilot-studio-ms-4018-practice-questions': {
    questions: COPILOT_MS_4018_QUESTIONS,
  },
  'azure-dp-100-practice-questions': {
    questions: AZURE_DP_100_QUESTIONS,
  },
  'comptia-a-plus-220-1201-practice-questions': {
    questions: COMPTIA_A_PLUS_QUESTIONS,
  },
  'comptia-server-plus-sk0-005-practice-questions': {
    questions: COMPTIA_SERVER_PLUS_QUESTIONS,
  },
  'power-bi-pl-300-dax-formulas-cheat-sheet': {
    cheatSheetSections: POWER_BI_PL_300_DAX_CHEAT_SHEET,
  },
  'azure-az-104-lab-setup-cli-cheat-sheet': {
    cheatSheetSections: AZURE_AZ_104_LAB_CLI_CHEAT_SHEET,
  },
  'enterprise-routing-switching-sdwan-security-cli-cheat-sheet': {
    cheatSheetSections: ENTERPRISE_ROUTING_SWITCHING_SECURITY_CLI_CHEAT_SHEET,
  },
  'cisco-ccnp-encor-350-401-practice-questions': {
    questions: CISCO_ENCOR_350_401_QUESTIONS,
  },
  'cisco-enarsi-sdwan-300-415-practice-questions': {
    questions: CISCO_ENARSI_SDWAN_QUESTIONS,
  },
  'cisco-security-scor-ise-cyberops-practice-questions': {
    questions: CISCO_SCOR_ISE_CYBEROPS_QUESTIONS,
  },
  'cisco-network-engineer-interview-questions': {
    interviewItems: CISCO_NETWORK_INTERVIEW_QA,
  },
};

export const EXAM_PREP_RESOURCES: ExamPrepResource[] = EXAM_PREP_META.map((meta) => ({
  ...meta,
  ...(EXAM_PREP_PAYLOAD_BY_SLUG[meta.slug] || {}),
}));

export function getExamPrepBySlug(slug: string): ExamPrepResource | null {
  const clean = decodeURIComponent(String(slug || '')).trim().toLowerCase();
  return EXAM_PREP_RESOURCES.find((r) => r.slug.toLowerCase() === clean) || null;
}

export function parseExamPrepRoutePath(
  pathname: string
):
  | { type: 'hub' }
  | { type: 'detail'; resource: ExamPrepResource }
  | { type: 'not_found' }
  | null {
  const metaMatch = parseExamPrepMetaRoutePath(pathname);
  if (!metaMatch) return null;
  if (metaMatch.type === 'hub' || metaMatch.type === 'not_found') return metaMatch;
  const full = getExamPrepBySlug(metaMatch.resource.slug);
  return full ? { type: 'detail', resource: full } : { type: 'not_found' };
}
