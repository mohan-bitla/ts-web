import { useEffect, useState } from "react";
import { loadCities, loadRoutes } from "../../api/bookings";
import BookingWidget from "./BookingWidget/BookingWidget";

const BookingEngineV1 = () => {

  const [cities, setCities] = useState([]);
  const [routes, setRoutes] = useState([]);

  const getCities = async () => {
    const cities = await loadCities();
    setCities(cities);
  };

  const getRoutes = async () => {
    const routes = await loadRoutes();
    setRoutes(routes);
  };

  useEffect(() => {
    getCities();
    getRoutes();
  }, []);

  return (
    <div>
      <BookingWidget cities={cities} routes={routes}/>
    </div>
  );
};

export default BookingEngineV1;
