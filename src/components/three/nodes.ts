export type OrbitNode = { id: string; ring: number; phase: number };

/** Technologies orbiting the AI core (kept free of three.js so it can be imported eagerly). */
export const ORBIT_NODES: OrbitNode[] = [
  { id: "react", ring: 0, phase: 0.2 },
  { id: "next", ring: 0, phase: Math.PI + 0.4 },
  { id: "node", ring: 1, phase: 0.9 },
  { id: "postgres", ring: 1, phase: 3.0 },
  { id: "stripe", ring: 1, phase: 5.0 },
  { id: "supabase", ring: 2, phase: 1.9 },
  { id: "n8n", ring: 2, phase: 4.6 },
];
