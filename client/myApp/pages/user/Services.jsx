import React, { useEffect, useState } from "react";
import getActiveServices from "../../services/service";
import "./styles.css";
import reactLogo from "../../src/assets/react.svg";
import ServiceCard from "../../components/common/ServiceCard";
import { Navigate, useNavigate } from "react-router-dom";

const Services = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [activeServices, setActiveServices] = useState([]);
  const navigate=useNavigate()
  async function handleActiveServices() {
    setLoading(true);
    setMessage("");
    try {
      const data = await getActiveServices();
      setActiveServices(data.services);
    } catch (error) {
      console.log(error.message);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    handleActiveServices();
  }, []);
  if (loading) return <p>Loading...</p>;
  function handleNavigate(id){
    navigate(`/timeslot/${id}`)
    
  }
  return (
    <div>
      <h1 className="heading">Available Services</h1>
      <div className="service-card-container">
        {activeServices.map((item) => (
          <ServiceCard
          key={item._id}
            logo={reactLogo}
            name={item.name}
            duration={item.duration}
            description={item.description}
            status={item.activeStatus}
            id={item._id}
            onNavigate={handleNavigate}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
