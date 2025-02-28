import { LoaderIcon } from "lucide-react";

interface FullScreeLoaderProps {
  label?: string;
  className?: string;
}

export const FullScreenLoader = ({
  label,
  className,
}: FullScreeLoaderProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2">
      <LoaderIcon className="size-6 text-muted-foreground animate-spin" />
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  );
};
