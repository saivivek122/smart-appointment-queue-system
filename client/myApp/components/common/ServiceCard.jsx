import "./ServiceCard.css";
const ServiceCard = ({ logo, name, duration, status, description,id ,onNavigate}) => {

  return (
    <div className="service-card">
      {/* Header */}
      <div className="card-header">
        <div className="logo">
          <img src={logo} alt={name} />
        </div>

        <span className={`status ${status === true ? "active" : "inactive"}`}>
          {status}
        </span>
      </div>

      {/* Content */}
      <h3 className="service-name">{name}</h3>
      <p className="duration">Duration: {duration}</p>

      <p className="description">{description}</p>

      {/* Button */}
      <button className="card-btn" onClick={()=>onNavigate(id)}>
        View Details
      </button>
    </div>
  );
};

export default ServiceCard;
