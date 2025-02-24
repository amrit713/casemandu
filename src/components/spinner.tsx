import { Loader2 } from "lucide-react";

export const Spinner = ({
  label,
  size = 24,
}: {
  label?: string;
  size?: number;
}) => {
  return (
    <div className=" flex items-center justify-center gap-4 flex-col">
      <Loader2 className={`size-${size} animate-spin text-primary/50`} />
      <p className="text-4xl text-zinc-600">{label} </p>
    </div>
  );
};
