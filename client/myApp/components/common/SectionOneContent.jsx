import React from 'react'
import sectionOneImage from "../../src/assets/section_one_image.png";
import circle from "../../src/assets/circle.svg";
import "./styles.css"
const SectionOneContent = () => {
  return (
    <div>
      <div className="section-one">
              <div className="background">
                <div className="background-content">
                  <div className="left">
                    <h1 className="heading">
                      Book Appointment<br></br> With Trusted Services
                    </h1>
                    <div className="text-logo">
                      <img className="circle" src={circle} alt="" />
                      <p className="sub-text">
                        Simply browse through our extended list of trusted services,
                        <br></br>schedule your appointment hands free
                      </p>
                    </div>
                    <button className="background-book-appointment-button">
                      Book appointment ➡
                    </button>
                  </div>
      
                  <div className="right">
                    <img className="section-one-image" src={sectionOneImage} alt="" />
                  </div>
                </div>
              </div>
            </div>
    </div>
  )
}

export default SectionOneContent
