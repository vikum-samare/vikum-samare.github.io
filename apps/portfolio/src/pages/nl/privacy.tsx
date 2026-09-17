import { nlContent } from '@/config';
import { PrivacyPage } from '@/components/PrivacyPage';

export default function NlPrivacyPage() {
  return <PrivacyPage content={nlContent} locale="nl" canonical="/nl/privacy/" />;
}
