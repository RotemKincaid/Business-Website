import { assets } from "../assets/assets"
import { AppContext } from "../context/AppContext"
import { NavLink } from "react-router-dom"
import { useContext } from "react"

const Footer = () => {
  const { businessName } = useContext(AppContext)

  return (
    <div className="md:mx-10">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
            {/* ------ Left Section ------ */}
            <div>
                <img className="mb-5 w-40" src={assets.logo} alt="" />
                <p className="w-full md:w-2/3 text-gray-600 leading-6">📍 Our Studio: Located inside HD Brows & Skin Rx in Chandler, offering a calm and private environment.
                <br />⏰ Hours: By appointment only, ensuring personalized care for every client. <br />   Discover the art of paramedical tattooing with Studio Illumi. Learn about our treatments, view our portfolio, and find answers to your questions all in one place.</p>
            </div>

            {/* ------ center Section ------ */}
            <div>
                <p className="text-xl font-medium mb-5 uppercase">{businessName}</p>
                <ul className="flex flex-col gap-2 text-gray-600">
                    <NavLink to="/">
                      <li>Home</li>
                    </NavLink>
                    <NavLink to="/about">
                      <li>About</li>
                    </NavLink>
                    <NavLink to="/contact">
                      <li>Contact</li>
                    </NavLink>
                    <NavLink to="/privacy">
                        <li>Privacy Policy</li>
                    </NavLink>
                </ul>
            </div>

            {/* ------ right Section ------ */}
            <div>
                <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                <ul className="flex flex-col gap-2 text-gray-600">
                    {/* To be changed into business email and number */}
                    <li className="flex">                     
                      <img className="w-5 mr-2" src={assets.phoneIcon} alt=""/>
                      <p>(480) 701-5587</p>
                    </li>
                    <li className="flex">
                    <img className="w-5 mr-2" src={assets.emailIcon} alt=""/>
                      rotem@studioillumi.com</li>
                    <li className="flex">
                      <img className="w-5 mr-2" src={assets.igIcon} alt=""/>
                      <a href="https://www.instagram.com/studio_illumi/">@studio_illumi</a>
                    </li>
                </ul>
            </div>
        </div>

        {/* ------ Copyright text ------ */}
        <div>
            <hr /> 
            <p className="py-5 text-sm text-center">Copyright 2024@ {businessName}. Your journey to restored confidence starts here.</p>
        </div>
    </div>
  )
}

export default Footer