import type { NextApiRequest, NextApiResponse } from "next";
import { getDB } from "@/lib/mock-db";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;
    const db = getDB();

    if (req.method === "GET") {
        const student = db.students.find((s) => s.id === Number(id));

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        return res.status(200).json(student);
    }

    return res.status(405).end();
}
