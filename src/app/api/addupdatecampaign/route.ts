import ProjectItems from "@/types/project";
import { closeMongoDB, connectMongoDB } from "lib/mongodb";
import MDBClient from "models/MDBClients";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiData = await request.json();
  const { _project_id, title, campaigns, plans }: ProjectItems =
    apiData.clients[0];

  try {
    /*
     * Connect to Mongo DB database
     */
    await connectMongoDB();

    /*
     * Check if campaign already exists in the DB
     */
    const mdb_clients_data = await MDBClient.find({
      _project_id,
      "campaigns._campaign_id": campaigns[0]._campaign_id,
    });

    if (mdb_clients_data.length > 0) {
      // update campaign if campaign exist
      await MDBClient.findOneAndUpdate(
        {
          "campaigns._campaign_id": campaigns[0]._campaign_id,
        },
        {
          $set: {
            "campaigns.$": campaigns[0],
          },
        }
      );
    } else {
      // add a new record if campaign does not exist
      await MDBClient.findOneAndUpdate(
        {
          _project_id,
        },
        {
          $push: {
            campaigns: campaigns[0],
          },
        }
      );
    }

    /*
     * Disconnect from Mongo DB
     */
    await closeMongoDB();
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Client Updated" }, { status: 201 });
}

export async function GET(request: Request) {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}
