import { Image } from './Image';

interface SkillBadgeProps {
  readonly name: string;
  readonly icon: string;
}

export function SkillBadge({ name, icon }: SkillBadgeProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-surface">
      <Image src={icon} alt={name} width={20} height={20} className="w-5 h-5 shrink-0" />
      <span className="text-sm text-text-primary whitespace-nowrap">{name}</span>
    </div>
  );
}
