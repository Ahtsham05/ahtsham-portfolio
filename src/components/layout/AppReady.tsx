"use client";

import { useEffect } from "react";
import { setAppReady } from "@/lib/ready";

/** Flips the global ready flag on pages that render without an intro loader. */
export function AppReady() {
  useEffect(() => setAppReady(), []);
  return null;
}
