import { RocketIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertSuccess({ msg }) {
  return (
    <Alert className="bg-green-100 border border-green-400 text-green-700">
      <RocketIcon className="h-4 w-4" />
      <AlertTitle className="text-slate-950 font-bold">Success!</AlertTitle>
      <AlertDescription className="text-slate-950">{msg}</AlertDescription>
    </Alert>
  );
}
