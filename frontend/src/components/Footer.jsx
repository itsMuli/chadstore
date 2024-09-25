import { assets } from "../assets/assets"

const Footer = () => {
  return (
    <div>
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
            <div>
            <img src={assets.logo} className="mb-5 w-12 h-12" alt="" />
            <p className="w-full md:w-2/3 text-gray-600">
                 ipsum dolor sit amet consectetur adipisicing elit. Dolore dolorum, fugiat odit similique totam eaque perspiciatis veniam? Velit nostrum corrupti eos, vel, ab incidunt id maiores placeat, cumque cupiditate quod?
            </p>
            </div>
            <div>
                <p className="text-xl font-medium mb-5">COMPANY</p>
                <ul className="flex flex-col gap-1 text-gray-600">
                    <li>Home</li>
                    <li>About</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div>
                <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                <ul className="flex flex-col gap-1 ext-gray-600">
                    <li>+1-212-456-7890</li>
                    <li>contact@chadsfashion.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr/>
            <p className="py-5 text-sm text-center">Copyright 2024 @chadsfashion.com- All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer