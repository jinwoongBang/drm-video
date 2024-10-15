"use client";

import { RecoilRoot } from "recoil";
import React from "react";

export function RecoilProvider({ children }: { children: React.ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
