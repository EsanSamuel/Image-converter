import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

type formatType = "jpeg" | "png" | "webp" | "avif" | "tiff" | "gif" | "svg";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();

    const files = formData.getAll("files") as Blob[] | null;
    const format = formData.get("format") as string | null;

    if (
      !files ||
      files.length === 0 ||
      !format ||
      !["jpeg", "png", "webp", "gif", "avif", "tiff", "svg"].includes(format)
    ) {
      return NextResponse.json(
        { error: "File and format are required!" },
        { status: 400 },
      );
    }

    const convertedImagesType = Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const imageBuffer = Buffer.from(arrayBuffer);

        const convertedImageType = await sharp(imageBuffer)
          .toFormat(format as formatType)
          .toBuffer();

        return convertedImageType;
      }),
    );

    return new NextResponse(
      JSON.stringify({
        images: (await convertedImagesType).map((img) =>
          img.toString("base64"),
        ),
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Convertion failed!" }, { status: 500 });
  }
};
