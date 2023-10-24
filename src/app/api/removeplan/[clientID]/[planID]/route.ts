import { closeMongoDB, connectMongoDB } from "lib/mongodb";
import MDBClient from "models/MDBClients";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { clientID: string; planID: string } }
) {
  const clientID = params.clientID;
  const planID = params.planID;
  try {
    await connectMongoDB();
    await MDBClient.findOneAndUpdate(
      {
        _project_id: clientID,
        "plans._plan_id": planID,
      },
      {
        $pull: {
          plans: { _plan_id: planID },
        },
      }
    );
    await closeMongoDB();
    return NextResponse.json({ message: "Plan Removed" }, { status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}

export async function GET(request: Request) {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}
