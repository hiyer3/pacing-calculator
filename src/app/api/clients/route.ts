import { connectMongoDB } from "lib/mongodb";
import MDBClient from "models/MDBClients";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const clients = await MDBClient.find({});
  return NextResponse.json({ clients }, { status: 201 });
}
