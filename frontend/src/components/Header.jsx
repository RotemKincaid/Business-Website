import { assets } from "../assets/assets"

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20">
        { /* ----- Left Side ----- */}
        <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
            <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight"> 
                Your Stretchmarks and scars <br /> Revised.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
                {/* <img src={assets.} alt="" /> */}
                <p>We provide expert scar and stretch mark camouflage tattoos that seamlessly blend imperfections,  <br className="hidden sm:block" /> leaving you with smooth, flawless skin and renewed confidence.</p>
            </div>
            <a className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300" href="#treatment">Book an Appointment 
            <img src={assets.arrowRight} className="w-5"></img>
            </a>
        </div>
        { /* ----- Right Side ----- */}
        <div className="md:w-1/2 relative">
            <img className="w-full md:absolute bottom-0 h-auto rounded-lg" src={assets.heartThigh} alt="" />
        </div>
    </div>
  )
}

export default Header