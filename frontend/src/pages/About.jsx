import { useContext } from "react"
import { assets } from "../assets/assets"
import { AppContext } from "../context/AppContext"

const About = () => {
  const { businessName } = useContext(AppContext)
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>ABOUT <span className="text-gray-700 font-medium">ME</span></p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img className="w-[550px] h-[550px] md:w-[350px] md:h-[350px] border-gray-500" src={assets.mePic} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>Welcome to {businessName} – Where Confidence Meets Camouflage

         </p>
          <p> At {businessName}, I specialize in paramedical tattoo treatments designed to restore confidence and help you feel your best in your own skin. Whether you’re looking to reduce the visibility of scars, stretch marks, or other skin imperfections, our expert treatments blend seamlessly with your natural skin tone, offering a long-lasting and natural-looking solution.</p>
          <b className="text-gray-800">My Expertise:</b> <span> I focus on two key treatments:</span>
          <ul>
            <li>Scar Camouflage: Using advanced tattooing techniques, I match pigments to your skin tone, reducing the visibility of scars from surgeries, injuries, or skin conditions. Our goal is to help you feel comfortable and confident by making scars less noticeable.
            </li>
            <li>Stretch Mark Camouflage: This treatment uses custom-blended pigments to reduce the appearance of stretch marks, whether they’re new or old. By restoring your skin’s natural tone and texture, I help stretch marks blend in, leaving your skin looking smoother and more even.</li>

          </ul>
          <b></b>
          {/* <p>At {businessName}, I understand that every client is unique. We take pride in offering personalized treatments tailored to your specific skin type and goals. Our mission is to provide not just a cosmetic service, but also a boost to your self-esteem by delivering results that look and feel natural. We’re dedicated to making sure you leave our studio feeling empowered and confident.

          Our Commitment to You:

          Safe and professional treatments
          Custom solutions for each individual
          A supportive and welcoming environment
          Let us help you regain confidence in your appearance with treatments that make a difference. Book a consultation today and take the first step toward loving the skin you’re in!</p> */}
          </div>
      </div>


      <div className="text-xl my-4">
        <p>WHY <span className="text-gray-700 font-semibold">CHOOSE ME</span></p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex items-center flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>SAFE & PROFESSIONAL</b>
          <p>Safe and professional treatments
      </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-16 flex items-center flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>CUSTOM SOLUTIONS</b>
          <p>Custom solutions for each individual</p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-16 flex items-center flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>SUPPORTIVE & WELCOMING</b>
          <p>A supportive and welcoming environment</p>
        </div>
      </div>
    </div>
  )
}

export default About