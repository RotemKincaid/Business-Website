import { assets } from "../assets/assets"

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20">
        { /* ----- Left Side ----- */}
        <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
            <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight"> 
            Enhance Your Beauty -  <br /> Flawless Brows, Seamless Skin.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
                {/* <img src={assets.} alt="" /> */}
                <p>your one-stop shop for all your beauty needs — from expert scar and stretch mark camouflage for smooth, flawless skin  <br className="hidden sm:block" /> to beautifully shaped, low-maintenance brows that enhance your natural beauty.</p>
            </div>
            <a className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300" href="#treatment">Book an Appointment 
            <img src={assets.arrowRight} className="w-5"></img>
            </a>
        </div>
        { /* ----- Right Side ----- */}
        <div className="md:w-1/2 relative">
            <img className="w-[600px] md:absolute bottom-[-16px] h-max-[500px] rounded-lg" src={assets.servicesImg} alt="" />
        </div>
    </div>
  )
}

export default Header