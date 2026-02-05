import { z } from "zod";

export const studentSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    year: z.number().int("Year must be an integer"),
    course: z.string().min(2, "Course must be at least 2 characters"),
    gpa: z.number().min(0, "GPA must be at least 0").max(4, "GPA must be at most 4")
});

export type StudentFormData = z.infer<typeof studentSchema>;

// For backward compatibility with API
export const createStudentSchema = studentSchema;
