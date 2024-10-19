"use client";

import { SpoonError } from "@/constants/error";

function Error({ error }: { error: SpoonError }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">{error.code}</h1>
      <p className="text-lg">{error.message}</p>
    </div>
  );
}

export default Error;
