"use client";

import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { MdOutlineCloudUpload } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { compressFile, downloadFile } from "@/app/utils/helper";
import Image from "next/image";

const page = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<File | null>(null);
  const [imageType, setImageType] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reducedMB, setReducedMB] = useState<number>(0);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewCompressed, setPreviewCompressed] = useState<string>("");
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type.startsWith("image")) {
      setSelectedImage(file as File);
      if (file.type.includes("/")) {
        const [, type] = file.type.split("/");
        setImageType(type as string);
      } else {
        setImageType(file.type);
      }
    } else {
      toast.error("Select Image file!");
    }
  };

  const ReducedBy = () => {
    if (selectedImage && compressedImage) {
      const subtractMB = selectedImage?.size - compressedImage?.size;
      setReducedMB(subtractMB);
    }
  };

  const handleCompress = async () => {
    try {
      setIsLoading(true);
      const compressImageFile = await compressFile(selectedImage as File);
      setCompressedImage(compressImageFile);
      toast.success("Image compressed successful!");
    } catch (error) {
      console.log(error);
      toast.error("Image compressed failed!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (compressedImage) {
      ReducedBy();
    }
  }, [compressedImage]);

  useEffect(() => {
    const previewImage = () => {
      if (selectedImage) {
        const url = URL.createObjectURL(selectedImage);
        setPreviewImage(url);
        return () => {
          url && URL.revokeObjectURL(url);
        };
      }
    };
    previewImage();
  }, [selectedImage]);

  useEffect(() => {
    const previewImage = () => {
      if (compressedImage) {
        const url = URL.createObjectURL(compressedImage);
        setPreviewCompressed(url);
        return () => {
          url && URL.revokeObjectURL(url);
        };
      }
    };
    previewImage();
  }, [compressedImage]);

  const handleDownload = async () => {
    try {
      downloadFile(compressedImage as File);
      toast.success("File Downloaded!");
    } catch (error) {
      console.log(error);
      toast.error("Downloading failed!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-between p-3 px-3 pt-[25%] sm:px-[20%] sm:pt-[10%] xl:flex-row">
        <aside>
          <div className="flex items-center gap-2">
            <IoChevronBack size={22} onClick={() => router.push("/select")} />{" "}
            <h1 className="text-[18px] font-semibold">Compress Image size</h1>
          </div>
          <div className="flex flex-col gap-3 pt-10">
            <div className="h-auto w-full rounded-[20px] border-[1px] px-4 py-2 xl:w-[250px]">
              <h1 className="font-semibold">Initial Type</h1>
              <p className="text-[12px]">
                {imageType ? imageType : "image/type"}
              </p>
            </div>
            <div className="h-auto w-full rounded-[20px] border-[1px] px-4 py-2 xl:w-[250px]">
              <h1 className="font-semibold">Initial Size</h1>
              {selectedImage ? (
                <p className="text-[12px]">{`${(selectedImage?.size / 1024 / 1024).toFixed(2)} MB`}</p>
              ) : (
                <p className="text-[12px]">0.00MB</p>
              )}
            </div>
          </div>

          <div className="bottom-[25%] xl:fixed">
            {compressedImage && (
              <div className="flex flex-col gap-2">
                <h1>
                  Compressed MB:{" "}
                  {`${(compressedImage?.size / 1024 / 1024).toFixed(2)} MB`}{" "}
                </h1>
                <p className="text-[11px]">
                  Reduced by: {`${(reducedMB / 1024 / 1024).toFixed(2)} MB`}{" "}
                </p>
              </div>
            )}
            <Button
              className={`mt-7 w-full rounded-[20px] bg-[#8c6dfd] px-10 py-7 text-[18px] hover:opacity-50 xl:w-[250px] ${isLoading && "opacity-50"}`}
              onClick={handleCompress}
            >
              {!isLoading ? "Compress Image" : "Compressing..."}
            </Button>
          </div>
        </aside>
        <div className="pt-10 xl:pt-0">
          {!compressedImage ? (
            <div className="flex h-[300px] w-full items-center justify-center rounded-[20px] border-[3px] border-dashed p-3 text-center xl:h-[400px] xl:w-[500px]">
              {!selectedImage ? (
                <div className="top-1/2 flex flex-col items-center justify-center gap-1 text-center">
                  <IoCloudUploadOutline className="text-gray-500" size={100} />
                  <p className="text-gray-500">Upload Image</p>
                  <Input
                    type="file"
                    id="picture"
                    accept="image/*"
                    className="mt-2"
                    onChange={handleImageChange}
                  />
                </div>
              ) : (
                <Image
                  src={previewImage}
                  width={1000}
                  height={1000}
                  alt="image"
                  className="rounded"
                />
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <h1 className="text-[18px] font-semibold">Compressed Image</h1>
              <Image
                src={previewCompressed}
                width={1000}
                height={1000}
                alt="image"
                className="h-auto w-auto max-w-[300px] rounded-[10px]"
              />
              <div className="mt-3">
                <Button className="rounded-full" onClick={handleDownload}>
                  Download
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
