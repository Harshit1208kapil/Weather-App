import { useState } from 'react';
import ForecastCard from '../Components/ForecastCard';
import Navbar from '../Components/Navbar';
import Weather from '../Components/Weather';

function Dashboard() {
  const [city, setCity] = useState('London');

  return (
    <div className="relative min-h-screen">
      {/* Fixed Background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <main className="flex-1 pt-0">
        <Navbar setCity={setCity} />
        <div className="mt-4 p-4"> {/* Add padding to ensure content is not touching the navbar */}
          <Weather city={city} />
          <ForecastCard city={city} />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
