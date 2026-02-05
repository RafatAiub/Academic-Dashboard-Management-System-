import { useEffect, useState } from "react";
import StudentTable from "@/components/tables/StudentTable";
import StudentForm from "@/components/forms/StudentForm";
import { Student } from "@/types/student";
import { StudentService } from "@/services/student.service";
import { StudentFormData } from "@/lib/validators";

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const limit = 5;

    useEffect(() => {
        fetchStudents();
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

    async function handleCreateStudent(data: StudentFormData) {
        await StudentService.create(data);
        setPage(1);
        fetchStudents();
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

            {/* Search */}
            <div className="mb-4 mt-8">
                <input
                    type="text"
                    placeholder="Search by name..."
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
