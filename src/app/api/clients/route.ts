import { connectMongoDB } from "lib/mongodb";
import MDBClient from "models/MDBClients";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  try {
    const clients = await MDBClient.find({});
    return NextResponse.json({ clients }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { message: "Error fetching all projects. Please refresh the app." },
      { status: 201 }
    );
  }
}
