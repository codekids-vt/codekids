import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { RushHour } from "@codekids-vt/rush-hour";

export default function RushHourPage() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center container mx-auto z-10 min-h-screen">
        <RushHour />
      </div>
      <Footer />
    </div>
  );
}
