// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next/types";
import { SummarizedFarmsResults } from "types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return await getSummarizedAllFarmsResults(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", status: false });
  }
}

async function getSummarizedAllFarmsResults(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  try {
    if (!session) res.json({ message: "The is no user" });
    const allResults = await prisma?.farm.findMany({
      where: { User: { id: session?.user.userId } },
      select: {
        id: true,
        producedFarmEnergy: {
          include: { yearly: true },
        },
      },
    });

    if (allResults) {
      const amountOfFarms = allResults.length;

      const averagePVProduction = allResults.reduce(
        (accumulator, currentValue) => {
          if (currentValue.producedFarmEnergy?.yearly?.pVEnergyProductionKWH) {
            accumulator =
              accumulator +
              currentValue.producedFarmEnergy?.yearly?.pVEnergyProductionKWH;
          }

          return accumulator;
        },
        0
      );

      const returnResults: SummarizedFarmsResults = {
        amountOfFarms,
        averagePVProduction,
      };

      res.status(200).json(returnResults);
    }

    res.status(200).json(allResults);
  } catch (error) {}
}
