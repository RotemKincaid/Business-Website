import { assets } from "../assets/assets"

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>CONTACT <span className="text-gray-700 font-medium">ME</span></p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm ">
        <img className="w-full md:max-w-[360px]" src={assets.strech4} alt="" />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600">Currently located at</p>
          <div className="text-gray-500 "><p className="font-bold">HD Brow & Skin Rx</p><br />
            3125 S Alma School <br />
            Unit 7 <br />
            Chandler, AZ 85248 <br />
            USA
          </div>
          <p className="text-gray-500">Tel (480) 701-5587 <br/> rotem@studioillumi.com</p>
          <a className="flex" href="https://www.instagram.com/studio_illumi/">
              <img className="w-5 mr-2" src={assets.igIcon} alt=""/>
              <p>@studio_illumi</p>
          </a>
        </div>
        
      </div>

    </div>
  )
}

export default Contact