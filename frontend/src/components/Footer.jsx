import { assets } from "../assets/assets"

const Footer = () => {
  return (
    <div className="md:mx-10">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
            {/* ------ Left Section ------ */}
            <div>
                <img className="mb-5 w-40" src={assets.logo} alt="" />
                <p className="w-full md:w-2/3 text-gray-600 leading-6">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam eius esse minima soluta laudantium corrupti accusamus voluptates beatae asperiores rem vel voluptate eligendi, labore voluptatibus, at provident qui. Veniam, nulla?</p>
            </div>

            {/* ------ center Section ------ */}
            <div>
                <p className="text-xl font-medium mb-5">COMPANY</p>
                <ul className="flex flex-col gap-2 text-gray-600">
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                    <li>Privacy Policy</li>

                </ul>
            </div>

            {/* ------ right Section ------ */}
            <div>
                <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                <ul className="flex flex-col gap-2 text-gray-600">
                    {/* To be changed into business email and number */}
                    <li>702-684-1510</li>
                    <li>rotema23@gmail.com</li>
                </ul>
            </div>
        </div>

        {/* ------ Copyright text ------ */}
        <div>
            <hr /> 
            <p className="py-5 text-sm text-center">Copyright 2024@ Smooth Glow by Ro - All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer