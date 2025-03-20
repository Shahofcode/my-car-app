import { NextApiRequest, NextApiResponse } from "next";

let batteryLevel = 40; 

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        res.status(200).json({ batteryLevel });
    } else if (req.method === "POST") {
        batteryLevel = Math.min(batteryLevel + 1, 100); // Öka batterinivån, max 100%
        res.status(200).json({ batteryLevel });
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
