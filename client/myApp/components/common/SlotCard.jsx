import "./SlotCard.css";
const SlotCard = ({
  serviceName,
  date,
  startTime,
  endTime,
  isActive,
  slotId,
  serViceId,
  isSlotBooked,
  onCardClick,
  onBook,
}) => {  
  return (
    <div
      className={`slot-card ${isActive ? "active" : "inactive"}`}
      onClick={isActive ? onCardClick : undefined}
    >
      <div className="slot-top">
        <h3>{serviceName}</h3>
        <span className={`slot-status ${isActive ? "on" : "off"}`}>
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="slot-info">
        <div>
          <p className="label">Date</p>
          <p className="value">{date}</p>
        </div>

        <div>
          <p className="label">Time</p>
          <p className="value">
            {startTime} – {endTime}
          </p>
        </div>
      </div>

      <div className="slot-footer">
        <button
          className="book-btn"
          // disabled={!isActive}
          disabled={isSlotBooked}
          // onClick={(e) => {
          //   e.stopPropagation();
          //   onBook(getSlotAndServiceId(serViceId,slotId));
          // }}
          onClick={()=>onBook(serViceId,slotId)}
        >
          Book Slot
        </button>
      </div>
    </div>
  );
};

export default SlotCard;
