import type { NextApiRequest, NextApiResponse } from "next/types";
import { FarmModelI } from "types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await getFarmById(req, res);
  } else if (req.method === "PUT") {
    await updateFarmById(req, res);
  } else if (req.method === "DELETE") {
    await deleteFarmById(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", status: false });
  }
}

async function getFarmById(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query && Number(req.query.farmId);
    const farmlooking = await prisma?.farm.findUnique({
      where: {
        id,
      },
      include: {
        location: true,
        pvPanel: true,
        producedFarmEnergy: {
          include: {
            yearly: true,
            monthly: true,
          },
        },
      },
    });

    return res.status(200).json(farmlooking);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something go wrong!", success: false });
  }
}

async function updateFarmById(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = req.body as FarmModelI;

    if (body.id) {
      try {
        await prisma?.farm.update({
          where: { id: body.id },
          data: {
            farmName: body.farmName,
            location: {
              update: {
                latitude: body.location.latitude,
                longitude: body.location.longitude,
              },
            },
            pvPanel: {
              update: {
                loss: body.pvPanel.loss,
                peakPower: body.pvPanel.peakPower,
              },
            },
          },
        });

        res.status(200).json({ message: "Farm changed successfully!" });
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Something go wrong!", success: false });
  }
}

async function deleteFarmById(req: NextApiRequest, res: NextApiResponse) {
  try {
    const farmId = req.body as number;

    if (farmId) {
      try {
        await prisma?.farm.delete({
          where: { id: farmId },
        });

        res.status(200).json({ message: "Farm deleted successfully!" });
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Something go wrong!", success: false });
  }
}
