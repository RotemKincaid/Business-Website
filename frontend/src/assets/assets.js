import strech1 from "./strechmarks.jpeg"
import strech2 from "./stretch-marks2.jpeg"
import strech3 from "./strech3.jpeg"
import strech4 from "./stretch-marks5.jpeg"
import strech5 from "./stretch-marks6.jpeg"
import tattMachine from "./tattMachine.png"
import tattPrep from "./Tattoo+Prep+1.jpeg"
import heartThigh from "./heart-thigh.png"
import scar from "./scar.webp"
import logo from "./illumi-logo-lg.png"
import profilePic from "./profile-pic.jpg"
import dropdown from "./dropdown-icon.png"
import arrowRight from './arrow-right.png'
import scarImg from './scarImg.png'
import stretchImg from './stretchImg.png'
import legs from './legs-appt.png'
import infoIcon from './info-icon.png'
import menuIcon from './menuIcon.png'
import xIcon from './xIcon.png'

export const assets = {
    strech1,
    strech2,
    strech3,
    strech4,
    strech5,
    tattMachine,
    tattPrep,
    heartThigh,
    scar,
    logo,
    profilePic,
    dropdown,
    arrowRight,
    scarImg,
    stretchImg,
    legs,
    infoIcon,
    menuIcon,
    xIcon
}

export const treatmentsData = [
    {
        _id: 1,
        name: 'scars',
        service: 'Scar Camouflage',
        about: 'A specialized tattooing technique that blends pigment into the skin to reduce the visibility of scars. This treatment restores skin tone and texture, helping scars blend seamlessly with surrounding skin for a natural look.',
        description: "Scar camouflage treatment is a paramedical tattooing procedure designed to conceal scars by blending them with the surrounding skin tone. Using specialized pigments that are custom-matched to the client's skin, the procedure deposits the pigments into the scar tissue, effectively minimizing the appearance of the scar. It’s ideal for scars resulting from surgeries, injuries, or other skin traumas. The treatment works on both light and dark skin tones and is effective on flat scars. While results are immediate, it may take several sessions for optimal blending and long-lasting effects. Healing time is typically a few weeks, and results can last for several years, depending on skin type and lifestyle.",
        imageIcon: scarImg,
        image: scar
    },
    {
        _id: 2,
        name: 'stretchmarks',
        service: 'Stretch Mark Camouflage',
        about: 'A tattoo-based procedure that deposits custom-matched pigments into stretch marks, reducing their appearance by blending them into the surrounding skin. It improves the uniformity of skin tone and texture, making stretch marks less noticeable.',
        description: "Stretch mark camouflage treatment is a semi-permanent tattooing procedure that helps reduce the visibility of stretch marks by implanting custom-blended pigments into the skin. The technique focuses on restoring the skin’s natural color and texture to make stretch marks blend more naturally with the surrounding skin. This treatment works on both old and new stretch marks and is suitable for various skin types and tones. Multiple sessions may be needed depending on the depth and size of the stretch marks. Unlike traditional creams and treatments, stretch mark camouflage provides a more immediate and noticeable improvement. Results can last for several years, with little to no downtime after the procedure.",
        imageIcon: stretchImg,
        image: strech3
    },
]