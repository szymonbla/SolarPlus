import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next/types";
import { FarmModelI } from "types";
import { FarmEnergyResponse, ProducedEnergy } from "types/farmEnergy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return await getProducedEnergyByFarmId(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", status: false });
  }
}

async function getProducedEnergyByFarmId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id = req.query && Number(req.query.farmId);

    const farmlooking = await prisma?.farm.findUnique({
      where: {
        id,
      },
      include: { location: true, pvPanel: true },
    });

    if (farmlooking) {
      const responseProducedEnergy = await getEnergyFromExternalAPI(
        farmlooking
      );

      if (responseProducedEnergy) {
        const { outputs } = responseProducedEnergy.data;

        const producedEnergyData: ProducedEnergy = {
          yearlyPVEnergyProductionKWH: outputs.totals.fixed.E_y,
          yearToYearVariabilityKWH: outputs.totals.fixed["H(i)_y"],
          yearlyInPlaneIrradiationKWM2: outputs.totals.fixed.SD_y,
        };

        res.status(200).json(producedEnergyData);
      }
    } else {
      res.status(400).json({ message: "Farm was not found!", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Something go wrong!", success: false });
  }
}

async function getEnergyFromExternalAPI({
  location: { latitude, longitude },
  pvPanel: { loss, peakPower },
}: FarmModelI) {
  const URL = `https://re.jrc.ec.europa.eu/api/PVcalc?lat=${latitude}&lon=${longitude}&peakpower=${peakPower}&loss=${loss}&outputformat=json`;

  try {
    const response = await axios.get<FarmEnergyResponse>(URL);

    return response;
  } catch (error) {
    let message;
    if (axios.isAxiosError(error) && error.response) {
      message = error.response.data.message;
    } else message = String(error);
  }
}
