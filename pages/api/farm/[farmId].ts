import type { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await getFarmById(req, res);
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
      include: { location: true, pvPanel: true },
    });

    return res.status(200).json(farmlooking);
  } catch (error) {
    res.status(500).json({ message: "Something go wrong!", success: false });
  }
}
