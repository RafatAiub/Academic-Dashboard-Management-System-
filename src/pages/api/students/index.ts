import type { NextApiRequest, NextApiResponse } from "next";
import { getDB } from "@/lib/mock-db";
import { Student } from "@/types/student";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).end();
    }

    const { page = "1", limit = "10", search = "" } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);

    const db = getDB();
    let students: Student[] = db.students;

    // 🔍 search
    if (search) {
        students = students.filter((s) =>
            s.name.toLowerCase().includes(String(search).toLowerCase())
        );
    }

    const total = students.length;

    // 📄 pagination
    const start = (pageNum - 1) * limitNum;
    const end = start + limitNum;
    const paginated = students.slice(start, end);

    return res.status(200).json({
        data: paginated,
        meta: {
            total,
            page: pageNum,
            limit: limitNum
        }
    });
}
