"use client";
import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Services from "../components/Services";

const page = () => {
  const router = useRouter();
  return (
    <div className="bg-white pb-10">
      <Navbar />
      <div className="px-5 pt-[25%] text-center xl:px-[10%] xl:pt-[10%] ">
        <h1 className="text-[50px] font-bold xl:text-[70px]">
          Convert⚡ & Compress Images with Ease✨!
        </h1>

        <p className="pt-5 text-[18px] xl:text-[22px]">
          Transform your images into the format and size you need in seconds.
          Fast, reliable, and hassle-free.
        </p>

        <Button
          className="mt-7 bg-[#8c6dfd] px-10 py-7 text-[18px] hover:opacity-50"
          onClick={() => router.push("/select")}
        >
          Get Started
        </Button>
        <div className="mt-10 xl:p-10 p-5 xl:rounded-[30px] rounded-[20px]  bg-gray-50">
          <Image
            src="/screenshot1.png"
            alt=""
            width={1000}
            height={1000}
            className="w-full xl:rounded-[20px] rounded-[10px] shadow-md"
          />
        </div>
        <Services />
      </div>
    </div>
  );
};

export default page;
