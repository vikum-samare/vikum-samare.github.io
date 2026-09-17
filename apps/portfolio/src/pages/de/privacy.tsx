import { deContent } from '@/config';
import { PrivacyPage } from '@/components/PrivacyPage';

export default function DePrivacyPage() {
  return <PrivacyPage content={deContent} locale="de" canonical="/de/privacy/" />;
}
