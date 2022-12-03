import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next/types";
import { FarmModelI } from "types";
import {
  FarmEnergyResponse,
  ProducedFarmEnergy as ProducedEnergy,
} from "types/producedFarmEnergy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return await createProducedEnergy(req, res);
  } else if (req.method === "GET") {
    return await getProducedEnergyByFarmId(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", status: false });
  }
}

async function createProducedEnergy(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = req.body as FarmModelI;
    const farmlooking = await prisma?.farm.findUnique({
      where: {
        id: body.id,
      },
      include: { location: true, pvPanel: true },
    });

    if (farmlooking) {
      const responseProducedEnergy = await getEnergyFromExternalAPI(
        farmlooking
      );

      if (responseProducedEnergy.monthly && body.id) {
        await prisma?.producedFarmEnergy.create({
          data: {
            Farm: { connect: { id: body.id } },
            yearly: {
              create: responseProducedEnergy.yearly,
            },
            monthly: {
              createMany: {
                data: responseProducedEnergy.monthly,
                skipDuplicates: true,
              },
            },
          },
        });
        res.status(200).json({ status: true });
      }
      res.end();
    }
    res.end();
  } catch (error) {
    console.log(error);
  }
}

async function getProducedEnergyByFarmId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id = req.query && String(req.query.farmId);

    const producedFarmEnergyById = await prisma?.producedFarmEnergy.findUnique({
      where: { id },
      include: { yearly: true },
    });

    res.json(producedFarmEnergyById);
  } catch (error) {
    throw error;
  }
}

async function getEnergyFromExternalAPI({
  location: { latitude, longitude },
  pvPanel: { loss, peakPower },
}: FarmModelI) {
  const URL = `https://re.jrc.ec.europa.eu/api/PVcalc?lat=${latitude}&lon=${longitude}&peakpower=${peakPower}&loss=${loss}&outputformat=json`;

  try {
    const response = await axios.get<FarmEnergyResponse>(URL);

    const responseProducedEnergy = response.data;

    const test = mapToProducedEnergy(responseProducedEnergy);

    return test;
  } catch (error) {
    let message;
    if (axios.isAxiosError(error) && error.response) {
      message = error.response.data.message;
    } else message = String(error);
    throw error;
  }
}

function mapToProducedEnergy(
  responseProducedEnergy: FarmEnergyResponse
): ProducedEnergy {
  const { outputs } = responseProducedEnergy;
  return {
    yearly: {
      pVEnergyProductionKWH: outputs.totals.fixed.E_y,
      variabilityKWH: outputs.totals.fixed["H(i)_y"],
      inPlaneIrradiationKWM2: outputs.totals.fixed.SD_y,
    },
    monthly: outputs.monthly.fixed.map((item) => ({
      inPlaneIrradiationKWM2: item.SD_m,
      pVEnergyProductionKWH: item.E_m,
      variabilityKWH: item["H(i)_m"],
    })),
  };
}
