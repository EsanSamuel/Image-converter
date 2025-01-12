import React from "react";

import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";

const page = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <div className="px-[15%] pt-[10%] text-center">
        <h1 className="text-[70px] font-bold">
          Convert⚡ & Compress Images with Ease✨!
        </h1>

        <p className="pt-5 text-[22px]">
          Transform your images into the format and size you need in seconds.
          Fast, reliable, and hassle-free.
        </p>

        <Button className="mt-7 bg-[#8c6dfd] px-10 py-7 text-[18px] hover:opacity-50">
          Get Started!
        </Button>
      </div>
    </div>
  );
};

export default page;
