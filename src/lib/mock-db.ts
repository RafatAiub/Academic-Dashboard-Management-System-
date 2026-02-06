import { Student } from "@/types/student";
import { Course } from "@/types/course";
import { Faculty } from "@/types/faculty";
import { Enrollment } from "@/types/enrollment";
import rawData from "../../db.json";

interface DB {
    students: Student[];
    courses: Course[];
    faculty: Faculty[];
    enrollments: Enrollment[];
}

// clone once at server start
let db: DB = structuredClone(rawData) as unknown as DB;

export function getDB() {
    return db;
}

