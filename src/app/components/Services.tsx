"use client";

import { FileText, ImageDown, Images, ImageUpscale } from "lucide-react";
import React from "react";

const Services = () => {
  return (
    <div className="mt-10 xl:mt-20">
      <h1 className="text-[30px] font-bold xl:text-[50px]">
        Your all in one Image Tool!
      </h1>

      <div className="mt-10 grid grid-cols-1 items-center gap-5 rounded-[30px] bg-gray-50 p-3 px-3 xl:grid-cols-3 xl:p-10">
        <div className="flex flex-col items-center gap-2 rounded-[20px] bg-white px-5 py-8 text-center shadow-sm">
          <ImageDown
            size={50}
            className="rounded-md bg-[#b5f0f0] p-2 text-[#83a4e4]"
          />
          <h1 className="text-[22px] font-semibold">
            Compress Images with Ease
          </h1>
          <p className="text-[16px] text-gray-700">
            Effortlessly reduce image sizes without compromising quality. Save
            space while keeping your photos sharp and clear.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-[20px] bg-white px-5 py-8 text-center shadow-sm">
          <ImageUpscale
            size={50}
            className="rounded-md bg-[#cce0ff] p-2 text-[#8a2eff]"
          />
          <h1 className="text-[22px] font-semibold">
            Convert Single Image Types
          </h1>
          <p className="text-[16px] text-gray-700">
            Need to switch formats? Convert a single image into popular formats
            like PNG, JPEG, or WebP in just seconds.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-[20px] bg-white px-5 py-8 text-center shadow-sm">
          <Images
            size={50}
            className="rounded-md bg-[#ffe3e3] p-2 text-[#eb4174]"
          />
          <h1 className="text-[22px] font-semibold">
            Batch Image Type Conversion
          </h1>
          <p className="text-[16px] text-gray-700">
            Save time by converting multiple images to your desired format in
            one go. Seamlessly process bulk images with precision.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-[20px] bg-white px-5 py-8 text-center shadow-sm">
          <FileText
            size={50}
            className="rounded-md bg-[#fbddfd] p-2 text-[#c651cd]"
          />
          <h1 className="text-[22px] font-semibold">
            Resize Images
          </h1>
          <p className="text-[16px] text-gray-700">
            Adjust the dimensions of your images to fit any platform or
            requirement. Customize width and height optimal quality.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-[20px] bg-white px-5 py-8 text-center shadow-sm">
          <FileText
            size={50}
            className="rounded-md bg-[#cefad0] p-2 text-[#39e75f]"
          />
          <h1 className="text-[22px] font-semibold">Convert Images to PDF</h1>
          <p className="text-[16px] text-gray-700">
            Transform your images into a professional-looking PDF. Perfect for
            creating documents, presentations, or portfolios.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
