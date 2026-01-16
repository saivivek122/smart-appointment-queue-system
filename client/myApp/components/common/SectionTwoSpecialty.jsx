import React from 'react'
import doctor from "../../src/assets/doctor.svg"
import haircut from "../../src/assets/haircut.svg"
import electrician from "../../src/assets/electrician.svg"

const SectionTwoSpecialty = () => {
  return (
    <div>
      <h1 className='specialty-heading'>Find By Specialty</h1>
          <p className='specialty-sub-heading'>
            Simply browse through our extensive list of services,<br></br>schedule your appointment hassle free
          </p>
       <div className='logo-container'>
        <div className='sub-logo-container'>
        <img src={doctor} alt="" />
        <p>Doctor</p>
        </div>
        <div className='sub-logo-container'>
        <img src={haircut} alt="" />
        <p>Hair Cut</p>
        </div>
        <div className='sub-logo-container'>
        <img src={electrician} alt="" />
        <p>Electrician</p>
        </div>
       </div>
    </div>
  )
}

export default SectionTwoSpecialty
