import { useEffect, useState } from "react";
import CourseTable from "@/components/tables/CourseTable";
import CourseForm from "@/components/forms/CourseForm";
import { Course } from "@/types/course";
import { CourseService } from "@/services/course.service";
import { CourseFormData } from "@/lib/validators";
import { exportCoursesToCSV } from "@/lib/csv-utils";

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [allCourses, setAllCourses] = useState<Course[]>([]);

    const limit = 5;

    useEffect(() => {
        fetchCourses();
        fetchAllCourses();
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

    async function fetchAllCourses() {
        try {
            const res = await CourseService.list({
                page: 1,
                limit: 1000,
                search
            });
            setAllCourses(res.data);
        } catch (error) {
            console.error("Failed to fetch all courses:", error);
        }
    }

    async function handleCreateCourse(data: CourseFormData) {
        await CourseService.create(data);
        setPage(1);
        fetchCourses();
        fetchAllCourses();
    }

    function handleExportCSV() {
        exportCoursesToCSV(allCourses);
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

            {/* Search and Export */}
            <div className="mb-4 mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <input
                    type="text"
                    placeholder="Search by code or name..."
                    className="border border-gray-300 rounded-lg p-2 w-full sm:max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={search}
                    onChange={(e) => {
                        setPage(1);
                        setSearch(e.target.value);
                    }}
                />
                <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 font-medium whitespace-nowrap"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export to CSV
                </button>
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
