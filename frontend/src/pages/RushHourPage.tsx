import Navbar from "../components/Navbar";
import RushHour from "../components/RushHour/RushHour";

export default function RushHourPage() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center pt-10 mx-auto z-10 min-h-[100vh] w-full">
        <RushHour />
      </div>
    </div>
  );
}
