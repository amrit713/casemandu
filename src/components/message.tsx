import { TriangleAlert, CircleCheckBig } from "lucide-react";

interface MessageProps {
  success?: string | null;
  error?: string | null;
}

export const Message = ({ success, error }: MessageProps) => {
  if (success) {
    return (
      <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
        <CircleCheckBig />
        <p>{success}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
        <TriangleAlert />
        <p>{error}</p>
      </div>
    );
  }

  return null;
};
