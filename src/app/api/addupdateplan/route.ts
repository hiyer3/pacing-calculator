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
     * Check if plan already exists in the DB
     */
    const mdb_clients_data = await MDBClient.find({
      _project_id,
      "plans._plan_id": plans[0]._plan_id,
    });
 
    if (mdb_clients_data.length > 0) {
      // update plan if plan exist
      await MDBClient.findOneAndUpdate(
        {
          "plans._plan_id": plans[0]._plan_id,
        },
        {
          $set: {
            "plans.$": plans[0],
          },
        }
      );
    } else {
      // add a new record if plan does not exist
      await MDBClient.findOneAndUpdate(
        {
          _project_id,
        },
        {
          $push: {
            plans: plans[0],
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
