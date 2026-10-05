import type { VehicleShape } from "@/components/carrentals/visuals/shapes";

/**
 * DEMO FLEET — visual examples only, not a real rental company's inventory.
 *
 * To present a client's real fleet, replace these entries. Add `image` to use a
 * real photo (put files in /public/fleet/…); without it a studio-lit
 * illustration of `shape` is drawn instead. Rates are demo values.
 */
export type Vehicle = {
  id: string;
  brand: string;
  model: string;
  year: number;
  category: "Sports" | "Luxury Sedan" | "Luxury SUV" | "Supercar";
  /** Illustration used when there is no photo. */
  shape: VehicleShape;
  /** Real photo — e.g. { src: "/fleet/porsche-911.jpg", alt: "White Porsche 911 Carrera, side view" }. */
  image?: { src: string; alt: string };
  transmission: "Automatic" | "Manual";
  seats: number;
  fuel: "Petrol" | "Diesel" | "Hybrid" | "Electric";
  /** Daily rate in `fleetCurrency`. */
  dailyRate: number;
  /** Short selling points shown on the vehicle page preview. */
  features: string[];
  /** Shown in the fleet showcase (others still appear in booking / AI demos). */
  featured?: boolean;
};

export const fleetCurrency = "USD";

export const fleet: Vehicle[] = [
  {
    id: "porsche-911",
    brand: "Porsche",
    model: "911 Carrera",
    year: 2025,
    category: "Sports",
    shape: "coupe",
    transmission: "Automatic",
    seats: 4,
    fuel: "Petrol",
    dailyRate: 650,
    features: ["Sport Chrono", "Apple CarPlay", "Heated seats", "Delivery available"],
    featured: true,
  },
  {
    id: "mercedes-s-class",
    brand: "Mercedes-Benz",
    model: "S-Class",
    year: 2025,
    category: "Luxury Sedan",
    shape: "sedan",
    transmission: "Automatic",
    seats: 5,
    fuel: "Hybrid",
    dailyRate: 480,
    features: ["Executive rear seats", "Chauffeur option", "Massage seats", "Airport pickup"],
    featured: true,
  },
  {
    id: "range-rover-sport",
    brand: "Land Rover",
    model: "Range Rover Sport",
    year: 2025,
    category: "Luxury SUV",
    shape: "suv",
    transmission: "Automatic",
    seats: 5,
    fuel: "Hybrid",
    dailyRate: 420,
    features: ["Panoramic roof", "All-terrain modes", "Large luggage space", "Child seat on request"],
    featured: true,
  },
  {
    id: "bmw-7-series",
    brand: "BMW",
    model: "7 Series",
    year: 2025,
    category: "Luxury Sedan",
    shape: "sedan",
    transmission: "Automatic",
    seats: 5,
    fuel: "Petrol",
    dailyRate: 450,
    features: ["Rear theatre screen", "Chauffeur option", "Soft-close doors", "Wi-Fi hotspot"],
    featured: true,
  },
  {
    id: "lamborghini-huracan",
    brand: "Lamborghini",
    model: "Huracán",
    year: 2024,
    category: "Supercar",
    shape: "supercar",
    transmission: "Automatic",
    seats: 2,
    fuel: "Petrol",
    dailyRate: 1450,
    features: ["Track-ready", "Lift system", "Photo-ready delivery", "Deposit required"],
    featured: true,
  },
  {
    id: "mercedes-g-class",
    brand: "Mercedes-Benz",
    model: "G-Class",
    year: 2025,
    category: "Luxury SUV",
    shape: "suv",
    transmission: "Automatic",
    seats: 5,
    fuel: "Petrol",
    dailyRate: 690,
    features: ["Iconic design", "Off-road capable", "Premium audio", "Hotel delivery"],
  },
  {
    id: "cadillac-escalade",
    brand: "Cadillac",
    model: "Escalade",
    year: 2025,
    category: "Luxury SUV",
    shape: "suv",
    transmission: "Automatic",
    seats: 7,
    fuel: "Petrol",
    dailyRate: 380,
    features: ["7 seats", "Group transfers", "Large luggage space", "Chauffeur option"],
  },
];

export const showcaseFleet = fleet.filter((v) => v.featured);

export const formatRate = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: fleetCurrency, maximumFractionDigits: 0 }).format(amount);

export const vehicleName = (v: Vehicle) => `${v.brand} ${v.model}`;
