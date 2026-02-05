import axios from "axios";
import { Student } from "@/types/student";
import { StudentFormData } from "@/lib/validators";

export interface StudentListResponse {
    data: Student[];
    meta: {
        total: number;
        page: number;
        limit: number;
    };
}

export const StudentService = {
    list: async (params: {
        page: number;
        limit: number;
        search?: string;
    }): Promise<StudentListResponse> => {
        const res = await axios.get("/api/students", { params });
        return res.data;
    },

    create: async (data: StudentFormData): Promise<Student> => {
        const res = await axios.post("/api/students", data);
        return res.data;
    }
};
