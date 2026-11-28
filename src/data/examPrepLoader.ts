import { ExamPrepResource } from '../types';
import { getExamPrepMetaBySlug } from './examPrepMeta';

export async function loadExamPrepResourceClient(slug: string): Promise<ExamPrepResource | null> {
  const meta = getExamPrepMetaBySlug(slug);
  if (!meta) return null;

  switch (meta.slug) {
    case 'comptia-security-plus-sy0-701-practice-questions': {
      const m = await import('./examPrepQuestions');
      return { ...meta, questions: m.SECURITY_PLUS_SY0_701_QUESTIONS };
    }
    case 'azure-az-104-practice-questions': {
      const m = await import('./examPrepQuestions');
      return { ...meta, questions: m.AZURE_AZ_104_QUESTIONS };
    }
    case 'aws-saa-c03-practice-questions': {
      const m = await import('./examPrepQuestions');
      return { ...meta, questions: m.AWS_SAA_C03_QUESTIONS };
    }
    case 'power-bi-pl-300-practice-questions': {
      const m = await import('./examPrepQuestions2');
      return { ...meta, questions: m.POWER_BI_PL_300_QUESTIONS };
    }
    case 'comptia-network-plus-n10-009-practice-questions': {
      const m = await import('./examPrepQuestions2');
      return { ...meta, questions: m.NETWORK_PLUS_N10_009_QUESTIONS };
    }
    case 'azure-ai-102-practice-questions': {
      const m = await import('./examPrepQuestions2');
      return { ...meta, questions: m.AZURE_AI_102_QUESTIONS };
    }
    case 'comptia-network-plus-port-numbers-cheat-sheet': {
      const m = await import('./examPrepResources');
      return { ...meta, cheatSheetSections: m.NETWORK_PORTS_CHEAT_SHEET };
    }
    case 'kubernetes-cka-kubectl-commands-cheat-sheet': {
      const m = await import('./examPrepResources');
      return { ...meta, cheatSheetSections: m.KUBECTL_CKA_CHEAT_SHEET };
    }
    case 'azure-vs-aws-services-mapping-sheet': {
      const m = await import('./examPrepResources');
      return { ...meta, cheatSheetSections: m.AZURE_VS_AWS_CHEAT_SHEET };
    }
    case 'azure-administrator-interview-questions': {
      const m = await import('./examPrepResources');
      return { ...meta, interviewItems: m.AZURE_INTERVIEW_QA };
    }
    case 'comptia-security-soc-interview-questions': {
      const m = await import('./examPrepResources');
      return { ...meta, interviewItems: m.SECURITY_SOC_INTERVIEW_QA };
    }
    case 'power-bi-data-analyst-interview-questions': {
      const m = await import('./examPrepResources');
      return { ...meta, interviewItems: m.POWER_BI_INTERVIEW_QA };
    }
    case 'aws-solutions-architect-interview-questions': {
      const m = await import('./examPrepResources');
      return { ...meta, interviewItems: m.AWS_INTERVIEW_QA };
    }
    case 'azure-az-900-practice-questions': {
      const m = await import('./examPrepQuestions3');
      return { ...meta, questions: m.AZURE_AZ_900_QUESTIONS };
    }
    case 'aws-clf-c02-practice-questions': {
      const m = await import('./examPrepQuestions3');
      return { ...meta, questions: m.AWS_CLF_C02_QUESTIONS };
    }
    case 'cisco-ccna-200-301-practice-questions': {
      const m = await import('./examPrepQuestions3');
      return { ...meta, questions: m.CISCO_CCNA_200_301_QUESTIONS };
    }
    case 'microsoft-sc-900-practice-questions': {
      const m = await import('./examPrepQuestions3');
      return { ...meta, questions: m.MICROSOFT_SC_900_QUESTIONS };
    }
    case 'isc2-cissp-practice-questions': {
      const m = await import('./examPrepQuestions3');
      return { ...meta, questions: m.ISC2_CISSP_QUESTIONS };
    }
    case 'kubernetes-cka-practice-questions': {
      const m = await import('./examPrepQuestions3');
      return { ...meta, questions: m.KUBERNETES_CKA_QUESTIONS };
    }
    case 'terraform-associate-003-practice-questions': {
      const m = await import('./examPrepQuestions3');
      return { ...meta, questions: m.TERRAFORM_ASSOC_QUESTIONS };
    }
    case 'gcp-associate-cloud-engineer-practice-questions': {
      const m = await import('./examPrepQuestions3');
      return { ...meta, questions: m.GCP_ACE_QUESTIONS };
    }
    case 'comptia-linux-plus-xk0-005-practice-questions': {
      const m = await import('./examPrepQuestions3');
      return { ...meta, questions: m.LINUX_PLUS_QUESTIONS };
    }
    case 'ipv4-subnetting-cidr-cheat-sheet-calculator': {
      const m = await import('./examPrepResources2');
      return { ...meta, cheatSheetSections: m.IPV4_SUBNETTING_CIDR_CHEAT_SHEET };
    }
    case 'linux-networking-commands-cheat-sheet': {
      const m = await import('./examPrepResources2');
      return { ...meta, cheatSheetSections: m.LINUX_NETWORKING_CHEAT_SHEET };
    }
    case 'terraform-iac-commands-cheat-sheet': {
      const m = await import('./examPrepResources2');
      return { ...meta, cheatSheetSections: m.TERRAFORM_IAC_CHEAT_SHEET };
    }
    case 'comptia-itf-plus-fc0-u61-practice-questions': {
      const m = await import('./examPrepQuestionsExt7');
      return { ...meta, questions: m.COMPTIA_ITF_PLUS_QUESTIONS };
    }
    case 'azure-dp-900-practice-questions': {
      const m = await import('./examPrepQuestionsExt7');
      return { ...meta, questions: m.AZURE_DP_900_QUESTIONS };
    }
    case 'power-platform-pl-900-practice-questions': {
      const m = await import('./examPrepQuestionsExt7');
      return { ...meta, questions: m.POWER_PLATFORM_PL_900_QUESTIONS };
    }
    case 'comptia-cloud-essentials-clo-002-practice-questions': {
      const m = await import('./examPrepQuestionsExt7');
      return { ...meta, questions: m.CLOUD_ESSENTIALS_CLO_002_QUESTIONS };
    }
    case 'microsoft-copilot-studio-ms-4018-practice-questions': {
      const m = await import('./examPrepQuestionsExt7');
      return { ...meta, questions: m.COPILOT_MS_4018_QUESTIONS };
    }
    case 'azure-dp-100-practice-questions': {
      const m = await import('./examPrepQuestionsExt8');
      return { ...meta, questions: m.AZURE_DP_100_QUESTIONS };
    }
    case 'comptia-a-plus-220-1201-practice-questions': {
      const m = await import('./examPrepQuestionsExt8');
      return { ...meta, questions: m.COMPTIA_A_PLUS_QUESTIONS };
    }
    case 'comptia-server-plus-sk0-005-practice-questions': {
      const m = await import('./examPrepQuestionsExt8');
      return { ...meta, questions: m.COMPTIA_SERVER_PLUS_QUESTIONS };
    }
    case 'power-bi-pl-300-dax-formulas-cheat-sheet': {
      const m = await import('./examPrepResources2');
      return { ...meta, cheatSheetSections: m.POWER_BI_PL_300_DAX_CHEAT_SHEET };
    }
    case 'azure-az-104-lab-setup-cli-cheat-sheet': {
      const m = await import('./examPrepResources2');
      return { ...meta, cheatSheetSections: m.AZURE_AZ_104_LAB_CLI_CHEAT_SHEET };
    }
    case 'enterprise-routing-switching-sdwan-security-cli-cheat-sheet': {
      const m = await import('./examPrepResources2');
      return { ...meta, cheatSheetSections: m.ENTERPRISE_ROUTING_SWITCHING_SECURITY_CLI_CHEAT_SHEET };
    }
    case 'cisco-ccnp-encor-350-401-practice-questions': {
      const m = await import('./examPrepQuestionsCisco');
      return { ...meta, questions: m.CISCO_ENCOR_350_401_QUESTIONS };
    }
    case 'cisco-enarsi-sdwan-300-415-practice-questions': {
      const m = await import('./examPrepQuestionsCisco');
      return { ...meta, questions: m.CISCO_ENARSI_SDWAN_QUESTIONS };
    }
    case 'cisco-security-scor-ise-cyberops-practice-questions': {
      const m = await import('./examPrepQuestionsCisco');
      return { ...meta, questions: m.CISCO_SCOR_ISE_CYBEROPS_QUESTIONS };
    }
    case 'cisco-network-engineer-interview-questions': {
      const m = await import('./examPrepResources2');
      return { ...meta, interviewItems: m.CISCO_NETWORK_INTERVIEW_QA };
    }
    default:
      return meta;
  }
}
