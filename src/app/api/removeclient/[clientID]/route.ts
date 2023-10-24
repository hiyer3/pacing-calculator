import ProjectItems from "@/types/project";
import { closeMongoDB, connectMongoDB } from "lib/mongodb";
import MDBClient from "models/MDBClients";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { clientID: string } }
) {
  const clientID = params.clientID;

  try {
    await connectMongoDB();
    await MDBClient.deleteOne({
      _project_id: clientID,
    });
    await closeMongoDB();
    return NextResponse.json({ message: "Client Removed" }, { status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}

export async function GET(request: Request) {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}
