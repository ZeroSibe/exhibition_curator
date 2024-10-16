import React from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertDestructive } from "./AlertDestructive";

export default function Login() {
  return (
    <div>
      <div className="mt-4">
        <AlertDestructive msg={"test"} />
      </div>
    </div>
  );
}
