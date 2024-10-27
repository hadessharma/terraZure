import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(req, { params }) {
  const { name } = params;
  const fileName = `${name}.tf`;

  const filePath = path.join(process.cwd(), "./terraform", fileName);
  //   console.log("FILE_PATH: ", filePath);
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    // console.log("FILE: ", fileContent);
    return NextResponse.json({ content: fileContent, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "File Not Found", status: 404 });
  }
}
