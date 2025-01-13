import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();

    const files = formData.getAll("files") as Blob[] | null;
    const width = formData.get("width") as string | null;
    const height = formData.get("height") as string | null;

    if (!files || files.length === 0 || !width || !height) {
      return NextResponse.json(
        { error: "File,width & height are required!" },
        { status: 400 },
      );
    }

    const resizeImages = Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const imageBuffer = Buffer.from(arrayBuffer);

        const resizeImage = await sharp(imageBuffer)
          .resize(parseInt(width), parseInt(height))
          .toBuffer();

        return resizeImage;
      }),
    );

    return new NextResponse(
      JSON.stringify({
        images: (await resizeImages).map((img) => img.toString("base64")),
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
