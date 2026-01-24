import { Image } from './Image';

interface SkillCircleProps {
  readonly name: string;
  readonly percentage: number;
  readonly icon: string;
  readonly size?: number;
}

export function SkillCircle({ name, percentage, icon, size = 120 }: SkillCircleProps) {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="absolute inset-0 -rotate-90"
          width={size}
          height={size}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-border"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="text-accent-primary transition-all duration-slow ease-gentle"
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Image 
            src={icon} 
            alt={name}
            width={32}
            height={32}
            className="w-8 h-8 mb-1"
          />
          <span className="text-lg font-semibold text-accent-primary">
            {percentage}%
          </span>
        </div>
      </div>
      <span className="text-sm text-text-secondary">{name}</span>
    </div>
  );
}
