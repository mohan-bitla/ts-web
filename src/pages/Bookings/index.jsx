import { useEffect, useState } from "react";
import { loadCities } from "../../api/bookings";
import BookingWidget from "../../components/BookingWidget/BookingWidget";

const Bookings = () => {

  const [cities, setCities] = useState([]);

  const getCities = async () => {
    const cities = await loadCities();
    setCities(cities);
  };

  useEffect(() => {
    getCities();
  }, []);

  return (
    <div>
      <BookingWidget cities={cities}/>
    </div>
  );
};

export default Bookings;
