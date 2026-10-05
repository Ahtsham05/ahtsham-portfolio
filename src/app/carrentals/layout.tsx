import "./carrentals.css";
import { RentalLoader } from "@/components/carrentals/layout/RentalLoader";
import { RentalNav } from "@/components/carrentals/layout/RentalNav";
import { RentalFooter } from "@/components/carrentals/layout/RentalFooter";
import { RentalStickyCTA } from "@/components/carrentals/layout/RentalStickyCTA";

/** Car-rental niche page: its own intro, nav and footer, sharing the Ahtsham Labs shell. */
export default function CarRentalsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="cr-scope">
      <RentalLoader />
      <RentalNav />
      <div className="relative overflow-x-clip">
        <main id="main">{children}</main>
        <RentalFooter />
      </div>
      <RentalStickyCTA />
    </div>
  );
}
