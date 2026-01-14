import "./SlotCard.css";

const SlotCard = ({
  serviceName,
  date,
  startTime,
  endTime,
  isActive,
  onCardClick,
  onBook
}) => {
  return (
    <div
      className={`slot-card ${isActive ? "active" : "inactive"}`}
      onClick={isActive ? onCardClick : undefined}
    >
      {/* Header */}
      <div className="slot-top">
        <h3>{serviceName}</h3>
        <span className={`slot-status ${isActive ? "on" : "off"}`}>
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Info */}
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

      {/* Footer */}
      <div className="slot-footer">
        <button
          className="book-btn"
          disabled={!isActive}
          onClick={(e) => {
            e.stopPropagation(); // ✅ prevent card click
            onBook();
          }}
        >
          Book Slot
        </button>
      </div>
    </div>
  );
};

export default SlotCard;
