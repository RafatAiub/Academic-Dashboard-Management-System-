import { z } from "zod";

// Student Schema
export const studentSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    year: z.number().int("Year must be an integer"),
    course: z.string().min(2, "Course must be at least 2 characters"),
    gpa: z.number().min(0, "GPA must be at least 0").max(4, "GPA must be at most 4")
});

export type StudentFormData = z.infer<typeof studentSchema>;

// For backward compatibility with API
export const createStudentSchema = studentSchema;

// Course Schema
export const courseSchema = z.object({
    code: z.string().min(2, "Course code must be at least 2 characters"),
    name: z.string().min(3, "Course name must be at least 3 characters"),
    credits: z.number().int("Credits must be an integer").min(1).max(6),
    department: z.string().min(2, "Department must be at least 2 characters"),
    instructor: z.string().optional()
});

export type CourseFormData = z.infer<typeof courseSchema>;
