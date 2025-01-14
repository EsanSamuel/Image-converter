"use client";
import Navbar from "@/app/components/Navbar";
import { downloadFile } from "@/app/utils/helper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoChevronBack, IoCloudUploadOutline } from "react-icons/io5";
import { toast } from "sonner";

const Page = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [imageType, setImageType] = useState("");
  const [format, setFormat] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [convertedImage, setConvertedImage] = useState<Blob | null>(null);
  const [convertedImageType, setConvertedImageType] = useState<string>("");
  const [previewConverted, setPreviewConverted] = useState("");
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type.startsWith("image")) {
      setSelectedImage(file as File);
      if (file?.type.includes("/")) {
        const [, type] = file.type.split("/");
        setImageType(type as string);
      } else {
        setImageType(file?.type);
      }
    } else {
      toast.error("Select image file!");
    }
  };

  const handleFormatChange = (e: any) => {
    setFormat(e.target.value as string);
  };

  const handleConvert = async () => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("file", selectedImage as File);
      formData.append("format", format);

      const response = await fetch("/api/convert-single-image", {
        method: "POST",
        body: formData,
      });
      toast.success(`Image type converted to ${format}`);

      if (!response.ok) {
        toast.error("Image Format convertion Failed!");
      }

      const blob = await response.blob();
      setConvertedImage(blob);
      if (blob?.type.includes("/")) {
        const [, type] = blob.type.split("/");
        setConvertedImageType(type as string);
      } else {
        setConvertedImageType(blob?.type);
      }
    } catch (error) {
      console.log(error);
      toast.error("Image Format convertion Failed!");
    } finally {
      setIsLoading(false);
    }
  };

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
      if (convertedImage) {
        const url = URL.createObjectURL(convertedImage);
        setPreviewConverted(url);
        return () => {
          url && URL.revokeObjectURL(url);
        };
      }
    };
    previewImage();
  }, [convertedImage]);

  const handleDownload = async () => {
    try {
      downloadFile(convertedImage as File);
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
            <h1 className="text-[18px] font-semibold">
              Convert single image type
            </h1>
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
            <div className="h-auto w-full px-4 py-2 xl:w-[250px]">
              <h1 className="pb-1 font-semibold">Change image Type</h1>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select image type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jpeg">JPEG</SelectItem>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="webp">WEBP</SelectItem>
                  <SelectItem value="tiff">TIFF</SelectItem>
                  <SelectItem value="avif">AVIF</SelectItem>
                  <SelectItem value="gif">GIF</SelectItem>
                  <SelectItem value="svg">SVG</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bottom-[25%] xl:fixed">
            <Button
              onClick={handleConvert}
              className={`mt-7 w-full rounded-[20px] bg-[#8c6dfd] px-10 py-7 text-[18px] hover:opacity-50 xl:w-[250px] ${isLoading && "opacity-50"}`}
            >
              {isLoading ? "Converting..." : "Convert"}
            </Button>
          </div>
        </aside>
        <div className="pt-10 xl:pt-0">
          {!convertedImage ? (
            <div className="flex h-[300px] w-full items-center justify-center rounded-[20px] border-[3px] border-dashed p-3 text-center xl:h-[400px] xl:w-[500px]">
              {!selectedImage ? (
                <>
                  <div className="top-1/2 flex flex-col items-center justify-center gap-1 text-center">
                    <IoCloudUploadOutline
                      className="text-gray-500"
                      size={100}
                    />
                    <p className="text-gray-500">Upload Image</p>
                    <Input
                      type="file"
                      id="picture"
                      accept="image/*"
                      className="mt-2"
                      onChange={handleImageChange}
                    />
                  </div>
                </>
              ) : (
                <Image
                  src={previewImage}
                  width={1000}
                  height={1000}
                  alt="image"
                  className="rounded max-h-[300px] h-auto"
                />
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <h1 className="text-[18px] font-semibold">Compressed Image</h1>
              <Image
                src={previewConverted}
                width={1000}
                height={1000}
                alt="image"
                className="max-h-[300px] h-auto w-auto max-w-[300px] rounded-[10px]"
              />
              <div className="mt-3">
                <Button className="rounded-full" onClick={handleDownload}>
                  Download
                </Button>
              </div>
              {convertedImage && (
                <div className="flex flex-col gap-2">
                  <h1>
                    Converted image MB:{" "}
                    {`${(convertedImage?.size / 1024 / 1024).toFixed(2)} MB`}{" "}
                  </h1>
                  <p className="text-[11px]">
                    Converted image Type: {convertedImageType}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
