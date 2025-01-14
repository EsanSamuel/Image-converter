"use client";
import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import { LiaCompressArrowsAltSolid } from "react-icons/lia";
import { Separator } from "@/components/ui/separator";
import { NotepadText } from "lucide-react";

const Page = () => {
  const router = useRouter();
  return (
    <div className="bg-white">
      <Navbar />
      <div className="px-5 pt-[25%] text-center md:pt-[10%] xl:px-[10%] xl:pt-[10%]">
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
        <div className="mt-10 rounded-[10px] bg-gray-50 p-5 md:rounded-[20px] xl:rounded-[30px] xl:p-10">
          <Image
            src="/screenshot1.png"
            alt=""
            width={1000}
            height={1000}
            className="w-full rounded-[5px] shadow-md md:rounded-[10px] xl:rounded-[20px]"
          />
        </div>
        <Services />
        <div className="mt-10 xl:mt-20">
          <h1 className="text-[30px] font-bold xl:text-[50px]">How it works</h1>
          <div className="flex flex-col justify-between gap-5 xl:flex-row xl:gap-20">
            <div className="mt-10 rounded-[10px] bg-gray-50 p-5 md:rounded-[20px] xl:rounded-[20px] xl:p-10">
              <Image
                src="/Screenshot (32).png"
                alt=""
                width={1000}
                height={1000}
                className="w-full rounded-[5px] shadow-md md:rounded-[10px] xl:rounded-[10px]"
              />
            </div>

            <div className="mt-10 flex w-auto flex-col items-center justify-center rounded-[20px] bg-gray-50 xl:p-10 md:p-10 p-5">
              <div className="flex h-auto w-full cursor-pointer gap-4 rounded-[20px] text-start sm:w-[300px]">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#cce0ff] p-2 text-center">
                  <NotepadText className="text-[#8a2eff]" />
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="text-[17px] font-bold">
                    Select Your Preferences
                  </h1>
                  <p className="text-[15px] text-gray-600">
                    Choose compression, conversion format or resizing dimension.
                  </p>
                </div>
              </div>
              <Separator className="my-5" />
              <div className="flex h-auto w-full cursor-pointer gap-4 rounded-[20px] text-start sm:w-[300px]">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#cce0ff] p-2 text-center">
                  <NotepadText className="text-[#8a2eff]" />
                </div>

                <div className="flex flex-col gap-1">
                  <h1 className="text-[17px] font-bold">Upload Your Images</h1>
                  <p className="text-[15px] text-gray-600">
                    Drag and drop or select Images from your device.
                  </p>
                </div>
              </div>
              <Separator className="my-5" />

              <div className="flex h-auto w-full cursor-pointer gap-4 rounded-[20px] text-start sm:w-[300px]">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#cce0ff] p-2 text-center">
                  <NotepadText className="text-[#8a2eff]" />
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="text-[17px] font-bold">Download</h1>
                  <p className="text-[15px] text-gray-600">
                    Instanly download your optimized or converted images
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 py-5 xl:mt-20">
          <Separator />

          <p className="text-[13px] text-gray-600 mt-5">
            © 2025 ImageKit. All rights reserved. Terms & Conditions | Privacy
            Policy | Contact | DMCA
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
