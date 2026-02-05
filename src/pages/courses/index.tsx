import { useEffect, useState } from "react";
import CourseTable from "@/components/tables/CourseTable";
import CourseForm from "@/components/forms/CourseForm";
import { Course } from "@/types/course";
import { CourseService } from "@/services/course.service";
import { CourseFormData } from "@/lib/validators";

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const limit = 5;

    useEffect(() => {
        fetchCourses();
    }, [page, search]);

    async function fetchCourses() {
        setLoading(true);
        try {
            const res = await CourseService.list({
                page,
                limit,
                search
            });
            setCourses(res.data);
            setTotal(res.meta.total);
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleCreateCourse(data: CourseFormData) {
        await CourseService.create(data);
        setPage(1);
        fetchCourses();
    }

    const totalPages = Math.ceil(total / limit);

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Courses</h1>
                <p className="text-gray-600 mt-1">Manage and view all courses</p>
            </div>

            {/* Course Form */}
            <CourseForm onSubmit={handleCreateCourse} />

            {/* Search */}
            <div className="mb-4 mt-8">
                <input
                    type="text"
                    placeholder="Search by code or name..."
                    className="border border-gray-300 rounded-lg p-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={search}
                    onChange={(e) => {
                        setPage(1);
                        setSearch(e.target.value);
                    }}
                />
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="text-gray-600">
                        <div className="animate-pulse">Loading courses...</div>
                    </div>
                </div>
            ) : (
                <CourseTable courses={courses} />
            )}

            {/* Pagination */}
            {!loading && totalPages > 0 && (
                <div className="flex items-center gap-4 mt-6">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Previous
                    </button>

                    <span className="text-gray-700">
                        Page <span className="font-semibold">{page}</span> of{" "}
                        <span className="font-semibold">{totalPages}</span>
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                    </button>

                    <span className="text-gray-600 ml-4">
                        Total: {total} course{total !== 1 ? "s" : ""}
                    </span>
                </div>
            )}
        </div>
    );
}
