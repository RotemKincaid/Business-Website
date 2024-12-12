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
          <p>Welcome to {businessName} 

         </p>
            <p> 
              Welcome to Studio Illumi, where beauty and confidence meet. I'm Ro, the founder and lead artist behind Studio Illumi, a place dedicated to helping you feel your best in your skin.
 
              I specialize in two transformative services: scar and stretch mark camouflage and now permanent brow makeup. My goal is simple: to enhance your natural beauty and help you regain confidence, whether it’s through correcting skin imperfections or perfecting your brows.
            </p>
          <b className="text-gray-800">My Expertise:</b> <span> I focus on two key treatments:</span>
          <ul>
            <li><span className="font-semibold">Scar & Stretch Mark Camouflage:</span> Using advanced tattooing techniques, I match pigments to your skin tone, reducing the visibility of scars from surgeries, injuries, or skin conditions, or to reduce the appearance of stretch marks, whether they’re new or old. By restoring your skin’s natural tone and texture, I help stretch marks blend in, leaving your skin looking smoother and more even. Our goal is to help you feel comfortable and confident by making scars less noticeable.
            </li>
            <br />

            <li>
              <div className="mb-4">
                <h2 className="font-bold mb-3">New! Permanent Brow Makeup</h2>

              I’m excited to introduce permanent brow makeup services, designed to give you perfect, low-maintenance brows that enhance your natural beauty. I offer two specialized brow techniques to achieve the ideal look for you:
              <br />

              <ol>
                <li>
                  <span className="font-semibold">Ombre Powder Brows:</span> This technique creates a soft, gradient effect where the brow starts lighter at the front and gradually becomes darker toward the tail. It gives the brows a beautifully defined, powdered look, similar to a soft, filled-in makeup look. Perfect for those looking for a bold yet soft and natural finish.</li>
                  <br />
                <li>
                <span className="font-semibold">Nano-Combo Brows: </span>This method combines the best of both worlds: Nano strokes and powder brows. Using ultra-fine nano-needles, I create precise hair-like strokes at the front of the brow and blend them into a soft powdery finish towards the tail for a more defined yet natural look. This is ideal for clients who want fuller brows with the texture of hair strokes and the added depth of powder.
                  With permanent brow makeup, you can wake up every day to beautifully shaped, hassle-free brows that last.
                  <br />

                </li>
              </ol>
              </div>
            </li>

          </ul>
          <p>At Studio Illumi, I believe in a personalized approach to beauty. Every service is tailored to meet your individual needs, ensuring that you leave feeling more confident and looking your best. Whether it’s perfecting your skin with camouflage or creating flawless brows, my goal is always to provide high-quality, customized results in a welcoming and professional environment.
            <br/>

         </p>

         Thank you for considering Studio Illumi. I look forward to helping you enhance your natural beauty!

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