"use client";
import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";
import React from "react";
import { LiaCompressArrowsAltSolid } from "react-icons/lia";

const Select = () => {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-5 px-3 pb-10 pt-[25%] sm:px-[20%] sm:pt-[10%]">
        <h1 className="text-center text-[22px]">
          What do you want to do chief?
        </h1>
        <div
          onClick={() => router.push("/compress-image")}
          className="flex h-[70px] w-full cursor-pointer items-center gap-2 rounded-[20px] border-[1px] p-5 text-start hover:opacity-50 sm:w-[300px]"
        >
          <LiaCompressArrowsAltSolid
            className="rounded-sm bg-[#cce0ff] p-2 text-[#8a2eff]"
            size={35}
          />
          <h1> Compress Image</h1>
        </div>
        <div
          onClick={() => router.push("/convert-singleImage")}
          className="flex h-[70px] w-full cursor-pointer items-center gap-2 rounded-[20px] border-[1px] p-5 text-start hover:opacity-50 sm:w-[300px]"
        >
          <LiaCompressArrowsAltSolid
            className="rounded-sm bg-[#ffe3e3] p-2 text-[#eb4174]"
            size={35}
          />
          <h1>Convert single image type</h1>
        </div>
        <div
          onClick={() => router.push("/convert-multiple-images")}
          className="flex h-[70px] w-full cursor-pointer items-center gap-2 rounded-[20px] border-[1px] p-5 text-start hover:opacity-50 sm:w-[300px]"
        >
          <LiaCompressArrowsAltSolid
            className="rounded-sm bg-[#b5f0f0] p-2 text-[#83a4e4]"
            size={35}
          />
          <h1>Convert multiple image types</h1>
        </div>
        <div
          onClick={() => router.push("/resize-image")}
          className="flex h-[70px] w-full cursor-pointer items-center gap-2 rounded-[20px] border-[1px] p-5 text-start hover:opacity-50 sm:w-[300px]"
        >
          <LiaCompressArrowsAltSolid
            className="rounded-sm bg-[#cefad0] p-2 text-[#39e75f]"
            size={35}
          />
          <h1>Resize image dimension</h1>
        </div>
        <div className="flex h-[70px] w-full cursor-pointer items-center gap-2 rounded-[20px] border-[1px] p-5 text-start hover:opacity-50 sm:w-[300px]">
          <LiaCompressArrowsAltSolid
            className="rounded-sm bg-[#fbddfd] p-2 text-[#c651cd]"
            size={35}
          />
          <h1>Convert image file to PDF</h1>
        </div>
      </div>
    </>
  );
};

export default Select;
