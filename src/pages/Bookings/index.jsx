import BookingEngineV1 from "../../components/bookingEngineV1";
import BookingEngineV2 from "../../components/bookingEngineV2";
import { useAuth } from "../../contexts/AuthContext";

const Bookings = () => {

  const { permissions } = useAuth();

  if( permissions.IsSinglePageBookingEnabled ) {
    return (
      <BookingEngineV2 />
    );
  }

  return (
    <BookingEngineV1 />
  );
};

export default Bookings;
