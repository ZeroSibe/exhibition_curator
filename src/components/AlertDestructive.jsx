import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription } from "@/components/ui/alert";

export function AlertDestructive({ msg }) {
  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertDescription>{msg}</AlertDescription>
    </Alert>
  );
}
