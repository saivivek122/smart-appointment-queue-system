import React, { useEffect, useState } from "react";
import getSlots from "../../services/slot";
import SlotCard from "../../components/common/SlotCard";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import handleBookingConfirmation from "../../services/bookingconfirmation";
const Slots = () => {
  const [slots, setSlots] = useState([]);
  const { id } = useParams();
  const navigate=useNavigate()
  async function getSlotsByService() {
    try {
      let data = await getSlots(id);
      setSlots(data.slots);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSlotsByService();
  }, [id]);

  let day = new Date();
  let date = day.getDate();
  let month = day.getMonth();
  let year = day.getFullYear();
  const filteredSlots = slots.filter((item) => {
    const formattedDate = new Date(item.date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const slotDate = Number(formattedDate.slice(0, 2));
    const slotMonth = Number(formattedDate.slice(3, 5));
    const slotYear = Number(formattedDate.slice(6, 10));
    return slotDate > date && slotMonth >= month + 1 && slotYear >= year;
  });
  function getSlotAndServiceId(serviceId, slotId) {
    handleBookingConfirmation(serviceId,slotId)
    console.log(serviceId,slotId)
    navigate("/appointment")
  }
  return (
    <div>
      <div className="time-slot-container">
        {filteredSlots.length > 0 ? (
          filteredSlots.map((item) => {
            const formattedDate = new Date(item.date).toLocaleDateString(
              "en-IN",
              {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }
            );
            return (
              <SlotCard
                serviceName={item.service.name}
                date={formattedDate}
                isActive={item.service.activeStatus}
                startTime={item.startTime}
                endTime={item.endTime}
                slotId={item._id}
                serViceId={item.service._id}
                isSlotBooked={item.isSlotBooked}
                onBook={getSlotAndServiceId}
              />
            );
          })
        ) : (
          <p>No slots available for this service</p>
        )}
      </div>
    </div>
  );
};

export default Slots;
