import { useEffect, useState } from "react";
import StudentTable from "@/components/tables/StudentTable";
import StudentForm from "@/components/forms/StudentForm";
import { Student } from "@/types/student";
import { StudentService } from "@/services/student.service";
import { StudentFormData } from "@/lib/validators";
import { exportStudentsToCSV } from "@/lib/csv-utils";

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [allStudents, setAllStudents] = useState<Student[]>([]);

    const limit = 5;

    useEffect(() => {
        fetchStudents();
        fetchAllStudents();
    }, [page, search]);

    async function fetchStudents() {
        setLoading(true);
        try {
            const res = await StudentService.list({
                page,
                limit,
                search
            });
            setStudents(res.data);
            setTotal(res.meta.total);
        } catch (error) {
            console.error("Failed to fetch students:", error);
        } finally {
            setLoading(false);
        }
    }

    async function fetchAllStudents() {
        try {
            const res = await StudentService.list({
                page: 1,
                limit: 1000,
                search
            });
            setAllStudents(res.data);
        } catch (error) {
            console.error("Failed to fetch all students:", error);
        }
    }

    async function handleCreateStudent(data: StudentFormData) {
        await StudentService.create(data);
        setPage(1);
        fetchStudents();
        fetchAllStudents();
    }

    function handleExportCSV() {
        exportStudentsToCSV(allStudents);
    }

    const totalPages = Math.ceil(total / limit);

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Students</h1>
                <p className="text-gray-600 mt-1">Manage and view all students</p>
            </div>

            {/* Student Form */}
            <StudentForm onSubmit={handleCreateStudent} />

            {/* Search and Export */}
            <div className="mb-4 mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <input
                    type="text"
                    placeholder="Search by name..."
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
                        <div className="animate-pulse">Loading students...</div>
                    </div>
                </div>
            ) : (
                <StudentTable students={students} />
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
                        Total: {total} student{total !== 1 ? "s" : ""}
                    </span>
                </div>
            )}
        </div>
    );
}
