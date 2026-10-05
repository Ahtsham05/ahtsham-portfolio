import Image from "next/image";
import type { Vehicle } from "@/content/carrentals/fleet";
import { VehicleArt } from "./VehicleArt";

/** A vehicle's photo when the fleet data has one, otherwise its studio illustration. */
export function VehicleMedia({
  vehicle,
  sizes = "(min-width: 1024px) 30vw, 80vw",
  className,
  lights = true,
  reflection = false,
  priority = false,
}: {
  vehicle: Vehicle;
  sizes?: string;
  className?: string;
  lights?: boolean;
  reflection?: boolean;
  priority?: boolean;
}) {
  if (vehicle.image) {
    return (
      <div className={`relative aspect-[1200/420] ${className ?? ""}`}>
        <Image src={vehicle.image.src} alt={vehicle.image.alt} fill sizes={sizes} priority={priority} className="object-contain" />
      </div>
    );
  }
  return (
    <VehicleArt
      shape={vehicle.shape}
      lights={lights}
      reflection={reflection}
      title={`Studio illustration of the ${vehicle.brand} ${vehicle.model} (${vehicle.category.toLowerCase()}, demo vehicle)`}
      className={`w-full overflow-visible ${className ?? ""}`}
    />
  );
}
