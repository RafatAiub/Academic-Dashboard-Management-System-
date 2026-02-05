import axios from "axios";
import { Student } from "@/types/student";

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
    }
};
