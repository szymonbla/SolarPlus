import { getSession } from "next-auth/react";
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
  const session = await getSession({ req });

  try {
    if (!session) res.json({ message: "The is no user" });

    const allFarms = await prisma?.farm.findMany({
      include: { location: true, pvPanel: true },
      where: { User: { id: session?.user.userId } },
    });
    res.status(200).json(allFarms);
  } catch (error) {
    res.status(500).json({ message: "Something go wrong!", success: false });
  }
}
