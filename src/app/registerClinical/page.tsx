"use client";
import { useEffect, useState } from "react";

import { Progress } from "@/components/ui/progress";

export default function registerClinical() {
  const [progress, setProgress] = useState<number>(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Progress value={progress} className="w-[60%]" />

      <h1>Inserir os dados do cadastro da clinica</h1>
    </div>
  );
}
