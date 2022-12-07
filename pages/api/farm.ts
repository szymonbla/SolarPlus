// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next/types";
import { FarmModelI } from "types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return await createFarm(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", status: false });
  }
}

async function createFarm(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body as FarmModelI;

  try {
    await prisma?.farm.create({
      data: {
        farmName: body.farmName,
        location: {
          create: {
            latitude: body.location.latitude,
            longitude: body.location.longitude,
          },
        },
        pvPanel: {
          create: {
            loss: body.pvPanel.loss,
            peakPower: body.pvPanel.peakPower,
          },
        },
      },
      include: {
        location: true,
        pvPanel: true,
      },
    });

    return res
      .status(200)
      .json({ message: "Farm created successfully!", success: true });
  } catch (error) {
    res.status(500).json(error);
  }
}

