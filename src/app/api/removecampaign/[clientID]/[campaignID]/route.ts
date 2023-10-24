import ProjectItems from "@/types/project";
import { closeMongoDB, connectMongoDB } from "lib/mongodb";
import MDBClient from "models/MDBClients";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { clientID: string; campaignID: string } }
) {
  const clientID = params.clientID;
  const campaignID = params.campaignID;
  try {
    await connectMongoDB();
    await MDBClient.findOneAndUpdate(
      {
        _project_id: clientID,
        "campaigns._campaign_id": campaignID,
      },
      {
        $pull: {
          campaigns: { _campaign_id: campaignID },
        },
      }
    );
    await closeMongoDB();
    return NextResponse.json({ message: "campaign Removed" }, { status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}

export async function GET(request: Request) {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}
