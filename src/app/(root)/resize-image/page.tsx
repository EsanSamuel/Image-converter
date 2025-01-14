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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Page = () => {
  const [selectedImages, setSelectedImages] = useState<File[] | null>(null);
  const [previewImages, setPreviewImages] = useState<
    { url: string; type: string; size: number }[]
  >([]);

  const [format, setFormat] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [convertedImages, setConvertedImages] = useState<string[]>([]);
  const [convertedImageType, setConvertedImageType] = useState<string>("");
  const [convertedImageSize, setConvertedImageSize] = useState<number>(0);
  const [imageSize, setImageSize] = useState<number>(0);
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [resizedImageFile, setResizedImageFile] = useState<File[] | null>(null);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = e.target.files;
      const fileArray = Array.from(files);
      setSelectedImages(fileArray);
      let totalSize = 0;
      for (const file of files) {
        setImageSize((totalSize += file.size));
      }
    } else {
      toast.error("Select Image files!");
    }
  };

  const getImageSizeFromBase64 = (base64String: string): number => {
    // Remove metadata if present (e.g., "data:image/png;base64,")
    const cleanBase64 = base64String.split(",").pop() || "";

    // Calculate the size in bytes
    const padding = (cleanBase64.match(/=/g) || []).length; // Count '=' characters
    const sizeInBytes = (cleanBase64.length * 3) / 4 - padding;

    return sizeInBytes;
  };

  const handleConvert = async () => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      selectedImages?.forEach((file) => formData.append("files", file));
      formData.append("width", width);
      formData.append("height", height);

      const response = await fetch("/api/resize-image", {
        method: "POST",
        body: formData,
      });
      toast.success(
        `Images type converted to ${parseInt(width)} x ${parseInt(height)}`,
      );

      if (!response.ok) {
        toast.error("Image Format convertion Failed!");
      }

      const data = await response.json();
      const images = data.images;

      const resizedFiles = images.map((base64String: string, index: number) => {
        // Convert base64 to Blob and File
        const byteString = atob(base64String); // Decode base64
        const byteArray = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
          byteArray[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([byteArray], { type: `image/png` }); // Adjust format dynamically
        return new File([blob], `converted_image_${index + 1}.png`, {
          type: `image/png`,
        });
      });

      setResizedImageFile(resizedFiles);

      images.forEach((base64String: string) => {
        const sizeInBytes = getImageSizeFromBase64(base64String);
        setConvertedImageSize(sizeInBytes);
      });

      const imageUrls = images.map(
        (base64Image: string) => `data:image/${format};base64,${base64Image}`,
      );

      setConvertedImages(imageUrls);
    } catch (error) {
      console.log(error);
      toast.error("Image Format convertion Failed!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const previewImage = () => {
      if (selectedImages) {
        const url = selectedImages.map((image) => ({
          url: URL.createObjectURL(image),
          type: image.type,
          size: image.size,
        }));
        setPreviewImages(url);
        return () => {
          if (previewImages) {
            previewImages.forEach(({ url }) => URL.revokeObjectURL(url!));
          }
        };
      }
    };
    previewImage();
  }, [selectedImages]);

  const handleDownload = async () => {
    try {
      resizedImageFile?.forEach((file) => downloadFile(file));
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
            <div className="flex items-center gap-2">
              <h1 className="text-[18px] font-semibold">Resize image</h1>

              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer rounded-full bg-[#8c6dfd] px-3 py-1 text-[11px] text-white">
                  Image size guide
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Image dimension usecase</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Thumbnail Images (150 x 150px)
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Profile Picture (400 x 400px)
                  </DropdownMenuItem>
                  <DropdownMenuItem>Small Image (600 x 600px)</DropdownMenuItem>
                  <DropdownMenuItem>
                    Medium Image (800 x 800px)
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Instagram Post (1080 x 1080px)
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Large Image (1200 x 1200px)
                  </DropdownMenuItem>
                  <DropdownMenuItem>HD (1280 x 720px)</DropdownMenuItem>
                  <DropdownMenuItem>
                    Large Social Media Banner (1500 x 500px)
                  </DropdownMenuItem>
                  <DropdownMenuItem>Full HD (1920 x 1080px)</DropdownMenuItem>
                  <DropdownMenuItem>
                    4K Resolution (3840 x 2160px)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-10">
            <div className="h-auto w-full rounded-[20px] border-[1px] px-4 py-2 xl:w-[250px]">
              <h1 className="flex items-center gap-2 font-semibold">
                Total Images size{" "}
                <p className="text-[11px]">
                  (
                  {selectedImages &&
                    selectedImages.length !== 0 &&
                    selectedImages?.length}
                  )
                </p>
              </h1>
              <p className="text-[12px]">
                {imageSize
                  ? `${(imageSize / 1024 / 1024).toFixed(2)} MB`
                  : "0.00 MB"}
              </p>
            </div>
            <div className="h-auto w-full px-4 py-2 xl:w-[250px]">
              <h1 className="pb-1 font-semibold">Change image width</h1>
              <Select value={width} onValueChange={setWidth}>
                <SelectTrigger>
                  <SelectValue placeholder="Select image width" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="150">150</SelectItem>
                  <SelectItem value="200">200</SelectItem>
                  <SelectItem value="400">400</SelectItem>
                  <SelectItem value="600">600</SelectItem>
                  <SelectItem value="800">800</SelectItem>
                  <SelectItem value="1024">1024</SelectItem>
                  <SelectItem value="1080">1080</SelectItem>
                  <SelectItem value="1200">1200</SelectItem>
                  <SelectItem value="1280">1280</SelectItem>
                  <SelectItem value="1440">1440</SelectItem>
                  <SelectItem value="1500">1500</SelectItem>
                  <SelectItem value="1600">1600</SelectItem>
                  <SelectItem value="1920">1920</SelectItem>
                  <SelectItem value="2560">2560</SelectItem>
                  <SelectItem value="3840">3840</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="h-auto w-full px-4 py-2 xl:w-[250px]">
              <h1 className="pb-1 font-semibold">Change image height</h1>
              <Select value={height} onValueChange={setHeight}>
                <SelectTrigger>
                  <SelectValue placeholder="Select image height" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="150">150</SelectItem>
                  <SelectItem value="200">200</SelectItem>
                  <SelectItem value="400">400</SelectItem>
                  <SelectItem value="400">500</SelectItem>
                  <SelectItem value="600">600</SelectItem>
                  <SelectItem value="720">720</SelectItem>
                  <SelectItem value="800">800</SelectItem>
                  <SelectItem value="1080">1080</SelectItem>
                  <SelectItem value="1200">1200</SelectItem>
                  <SelectItem value="1440">1440</SelectItem>
                  <SelectItem value="1600">1600</SelectItem>
                  <SelectItem value="1920">1920</SelectItem>
                  <SelectItem value="2160">2160</SelectItem>
                  <SelectItem value="2560">2560</SelectItem>
                  <SelectItem value="3840">3840</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bottom-[20%] xl:fixed">
            <Button
              onClick={handleConvert}
              className={`mt-7 w-full rounded-[20px] bg-[#8c6dfd] px-10 py-7 text-[18px] hover:opacity-50 xl:w-[250px] ${isLoading && "opacity-50"}`}
            >
              {isLoading ? "Resizing..." : "Resize"}
            </Button>
          </div>
        </aside>
        <div className="pt-10 xl:pt-0">
          {convertedImages.length === 0 ? (
            <div className="flex h-[300px] w-full items-center justify-center rounded-[20px] border-[3px] border-dashed p-3 text-center xl:h-[400px] xl:w-[500px]">
              {!selectedImages ? (
                <>
                  <div className="top-1/2 flex flex-col items-center justify-center gap-1 text-center">
                    <IoCloudUploadOutline
                      className="text-gray-500"
                      size={100}
                    />
                    <p className="text-gray-500">Upload multiple Images</p>
                    <Input
                      type="file"
                      id="picture"
                      accept="image/*"
                      className="mt-2"
                      onChange={handleImageChange}
                      multiple
                    />
                  </div>
                </>
              ) : (
                <div className="grid max-h-[300px] grid-cols-2 gap-2 overflow-y-auto p-2">
                  {previewImages?.map(({ url, type, size }, index) => {
                    return (
                      <div key={index} className="w-full xl:w-[200px]">
                        <Image
                          src={url}
                          width={1000}
                          height={1000}
                          alt="image"
                          className="h-auto max-h-[200px] w-full max-w-[300px] rounded-[10px]"
                        />
                        <h1 className="text-[12px]">
                          {type}, {`${(size / 1024 / 1024).toFixed(2)} MB`} ,
                        </h1>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="flex max-h-[300px] flex-col gap-3 overflow-y-auto p-2">
                <h1 className="text-[18px] font-semibold">Converted Image</h1>
                <div className="grid grid-cols-2 gap-2">
                  {convertedImages.map((image, index) => (
                    <div key={index} className="w-full xl:w-[200px]">
                      <Image
                        src={image}
                        width={1000}
                        height={1000}
                        alt="image"
                        className="h-auto max-h-[200px] w-full max-w-[300px] rounded-[10px]"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3">
                <Button className="rounded-full" onClick={handleDownload}>
                  Download
                </Button>
              </div>
              {convertedImages.length !== 0 && (
                <div className="mt-5 flex flex-col gap-2">
                  <h1>
                    Converted images MB:{" "}
                    {convertedImageSize
                      ? `${(convertedImageSize / 1024 / 1024).toFixed(2)} MB`
                      : "0.00 MB"}
                  </h1>
                  <p className="text-[11px]">{`Image dimension converted to ${parseInt(width)} x ${parseInt(height)}`}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
