import type { NextApiRequest, NextApiResponse } from "next/types";
import axios from "axios";

const PVGISapi = axios.create({
  baseURL: "https://re.jrc.ec.europa.eu/api/PVcalc?",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return await getTotalProducedEnergy(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", status: false });
  }
}

async function getTotalProducedEnergy(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const allFarms = await prisma?.farm.findMany({
      include: { location: true, pvPanel: true },
    });

    if (allFarms?.length === 0) {
      res.status(200).json({ message: "Empty array" });
    }

    if (allFarms) {
      const URL = `lat=${allFarms[0].location.latitude}&lon=${allFarms[0].location.longitude}&peakpower=${allFarms[0].pvPanel.peakPower}&loss=${allFarms[0].pvPanel.loss}&outputformat=json`;

      allFarms &&
        PVGISapi.get(URL)
          .then(({ data }) => res.status(200).json(data))
          .catch((err) => console.log(err));
    }
  } catch (error) {
    res.status(500).json({ message: error, success: false });
  }
}
