import {
  Wrench,
  Zap,
  Hammer,
  Car,
  Scissors,
  Paintbrush,
  Sparkles,
  Camera,
  Laptop,
  Briefcase,
  LucideProps,
} from "lucide-react";

interface CategoryIconProps extends LucideProps {
  name: string;
}

export function CategoryIcon({ name, ...props }: CategoryIconProps) {
  switch (name.toLowerCase()) {
    case "wrench":
    case "plumbing":
      return <Wrench {...props} />;
    case "zap":
    case "electrical":
      return <Zap {...props} />;
    case "hammer":
    case "carpentry":
      return <Hammer {...props} />;
    case "car":
    case "mechanics":
      return <Car {...props} />;
    case "scissors":
    case "tailoring":
      return <Scissors {...props} />;
    case "paintbrush":
    case "painting":
      return <Paintbrush {...props} />;
    case "sparkles":
    case "cleaning":
      return <Sparkles {...props} />;
    case "camera":
    case "photography":
      return <Camera {...props} />;
    case "laptop":
    case "computer-repairs":
      return <Laptop {...props} />;
    default:
      return <Briefcase {...props} />;
  }
}
