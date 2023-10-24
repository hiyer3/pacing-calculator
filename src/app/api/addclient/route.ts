import ProjectItems from "@/types/project";
import { closeMongoDB, connectMongoDB } from "lib/mongodb";
import MDBClient from "models/MDBClients";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiData = await request.json();
  const { _project_id, title, campaigns, plans }: ProjectItems =
    apiData.clients[0];
  console.log(apiData.clients[0]);
  await connectMongoDB();
  await MDBClient.create({
    _project_id,
    title,
    campaigns,
    plans,
  });
  await closeMongoDB();
  return NextResponse.json({ message: "Client Added" }, { status: 201 });
}

export async function GET(request: Request) {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}
