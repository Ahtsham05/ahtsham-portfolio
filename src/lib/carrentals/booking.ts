import { fleet, type Vehicle } from "@/content/carrentals/fleet";

/**
 * Booking layer for the demo. The UI only talks to `bookingProvider`, so a real
 * backend (Supabase, a rental API, your own /api route…) can replace
 * `demoProvider` without touching any component.
 */

export type RentalLocation = { id: string; name: string; kind: "airport" | "city" | "hotel" | "branch" };

/** Sample locations — replace with the client's branches and pickup points. */
export const locations: RentalLocation[] = [
  { id: "airport", name: "Airport — Arrivals Hall", kind: "airport" },
  { id: "downtown", name: "Downtown Showroom", kind: "city" },
  { id: "marina", name: "Marina Branch", kind: "branch" },
  { id: "hotel", name: "Hotel Delivery", kind: "hotel" },
];

export type BookingQuery = {
  pickupLocation: string;
  returnLocation: string;
  /** yyyy-mm-dd */
  pickupDate: string;
  /** yyyy-mm-dd */
  returnDate: string;
  /** A specific vehicle the customer asked about (e.g. from its vehicle page). */
  vehicleId?: string;
};

export type Quote = {
  vehicle: Vehicle;
  days: number;
  total: number;
  available: boolean;
};

export interface BookingProvider {
  searchAvailability(query: BookingQuery): Promise<Quote[]>;
}

export function rentalDays(pickup: string, ret: string) {
  const ms = new Date(ret).getTime() - new Date(pickup).getTime();
  return Math.max(1, Math.round(ms / 86_400_000));
}

/** yyyy-mm-dd for a date `offset` days from today (local time). */
export function isoDate(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Simulated provider: deterministic "availability" so the demo feels real. A requested vehicle is always free. */
export const demoProvider: BookingProvider = {
  async searchAvailability(query) {
    await new Promise((r) => setTimeout(r, 900));
    const days = rentalDays(query.pickupDate, query.returnDate);
    const seed = [...`${query.pickupDate}${query.returnDate}`].reduce((a, c) => a + c.charCodeAt(0), 0);
    return fleet
      .map((vehicle, i) => ({
        vehicle,
        days,
        total: vehicle.dailyRate * days,
        available: vehicle.id === query.vehicleId || (seed + i) % 6 !== 0,
      }))
      .sort((a, b) => Number(b.available) - Number(a.available));
  },
};

export const bookingProvider: BookingProvider = demoProvider;

/** Demo availability for the next `days` days of one vehicle (true = free). */
export function demoCalendar(vehicleId: string, days = 14) {
  const seed = [...vehicleId].reduce((a, c) => a + c.charCodeAt(0), 0);
  return Array.from({ length: days }, (_, i) => (seed + i * 7) % 5 !== 0);
}
