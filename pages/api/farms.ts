import type { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return await getAllFarms(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", status: false });
  }
}

async function getAllFarms(req: NextApiRequest, res: NextApiResponse) {
  try {
    const allFarms = await prisma?.farm.findMany({
      include: { location: true, pvPanel: true },
    });

    return res.status(200).json(allFarms);
  } catch (error) {
    res.status(500).json({ message: "Something go wrong!", success: false });
  }
}
