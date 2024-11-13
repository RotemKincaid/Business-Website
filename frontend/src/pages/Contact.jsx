import { assets } from "../assets/assets"

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>CONTACT <span className="text-gray-700 font-medium">US</span></p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm ">
        <img className="w-full md:max-w-[360px]" src={assets.strech4} alt="" />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600">OUR OFFICE</p>
          <p className="text-gray-500">123 Whatever Street <br />
            Suite 101, Gilbert, AZ, USA
          </p>
          <p className="text-gray-500">Tel (123) 456-7890 <br/> illumi@gmail.com</p>

          <button></button>
        </div>
        
      </div>

    </div>
  )
}

export default Contact