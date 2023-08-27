"use client";
import Image from "next/image";
/* eslint-disable */
// import bg from "../../public/bgvid.mp4";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [mobilenumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post("api/sendEmail", {
        name,
        mobilenumber,
        email,
      });
      if (response.status === 200) {
        toast.success("Your Whitelist is successfully sent to your email!", {
          autoClose: 4000,
        });
      } else {
        console.log("Response status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className=" max-h-fit pb-[10px] relative">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        autoPlay
        loop
        muted
      >
        <source src={"./bgvid.mp4"} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="flex justify-center items-center">
        <h1 className="text-white pt-5 md:text-[44px] text-[30px] font-semibold">
          Zk Connect 🚀
        </h1>
      </div>

      <div className="lg:mx-[300px] md:mx-[90px] mx-5  border-[10px] border-solid border-[#f5b8ff] rounded-[25px] bg-black bg-opacity-60">
        <div className="md:p-[20px]  mt-2 text-center py-4">
          <h1 className="text-[#DB00FF] font-sans md:text-center  md:text-[42px] text-[30px] font-bold leading-normal line-clamp-3 ">
            &quot;Unlock Tech Talent with ZkConnect&quot;
          </h1>

          <h1 className="text-white text-[23px] font-semibold leading-[29px] mt-[30px] text-center">
            Join Our Waiting List for Early Access
          </h1>

          <h1 className="text-white mx-2  font-sans text-[22px] font-normal leading-[38px] text-center mt-[30px]">
            Welcome to ZkConnect! Our AI-driven platform simplifies tech talent
            acquisition. Join our waiting list for early access and be part of
            the future of recruitment.
          </h1>
        </div>

        <div className="flex justify-center items-center flex-col">
          <div className="mb-[20px]">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Your Name"
              className="bg-transparent rounded-md md:w-[450px] h-[62px] py-[15px] px-[15px] border placeholder:text-[#D2D2D2] placeholder:text-[18px] font-semibold"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-[20px]">
            <input
              type="text"
              name="mobilenumber"
              id="mobilenumber"
              placeholder="Enter Your Phone No"
              className="bg-transparent rounded-md md:w-[450px] h-[62px] py-[15px] px-[15px] border placeholder:text-[#D2D2D2] placeholder:text-[18px] font-semibold"
              value={mobilenumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <div className="mb-[20px]">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter Your Email"
              className="bg-transparent rounded-md md:w-[450px] h-[62px] py-[15px] px-[15px] border placeholder:text-[#D2D2D2] placeholder:text-[18px] font-semibold"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            className="btn-grad rounded-[16px]  flex justify-center items-center px-[10px] py-[26px] pb-[20px]"
            onClick={handleRegister}
          >
            <span className="text-black text-2xl font-bold font-sans   leading-normal">
              LFG 🚀
            </span>
          </button>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
