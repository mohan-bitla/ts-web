import { useEffect, useState } from "react";
import { loadCities } from "../../api/bookings";
import BookingWidget from "./BookingWidget/BookingWidget";

const BookingEngineV1 = () => {

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

export default BookingEngineV1;
