"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny global flag flipped when the intro loader finishes,
 * so entrance animations start exactly as the curtain lifts.
 */
let ready = false;
const listeners = new Set<() => void>();

export function setAppReady() {
  if (ready) return;
  ready = true;
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useAppReady() {
  return useSyncExternalStore(
    subscribe,
    () => ready,
    () => false,
  );
}
