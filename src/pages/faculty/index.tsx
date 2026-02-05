import { useEffect, useState } from "react";
import FacultyTable from "@/components/tables/FacultyTable";
import FacultyForm from "@/components/forms/FacultyForm";
import { Faculty } from "@/types/faculty";
import { FacultyService } from "@/services/faculty.service";
import { FacultyFormData } from "@/lib/validators";

export default function FacultyPage() {
    const [faculty, setFaculty] = useState<Faculty[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const limit = 5;

    useEffect(() => {
        fetchFaculty();
    }, [page, search]);

    async function fetchFaculty() {
        setLoading(true);
        try {
            const res = await FacultyService.list({
                page,
                limit,
                search
            });
            setFaculty(res.data);
            setTotal(res.meta.total);
        } catch (error) {
            console.error("Failed to fetch faculty:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleCreateFaculty(data: FacultyFormData) {
        await FacultyService.create(data);
        setPage(1);
        fetchFaculty();
    }

    const totalPages = Math.ceil(total / limit);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 p-6">
            {/* Header Section with Gradient */}
            <div className="mb-8 relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full filter blur-3xl opacity-10"></div>
                <div className="relative z-10 flex items-center gap-4">
                    <div className="p-4 bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-white">Faculty Members</h1>
                        <p className="text-indigo-100 mt-2">Manage and view all faculty members</p>
                    </div>
                </div>
            </div>

            {/* Faculty Form */}
            <FacultyForm onSubmit={handleCreateFaculty} />

            {/* Search Section */}
            <div className="mb-6 mt-8">
                <div className="relative max-w-2xl">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name, email, or department..."
                        className="border-2 border-gray-300 rounded-xl p-4 pl-12 w-full focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md"
                        value={search}
                        onChange={(e) => {
                            setPage(1);
                            setSearch(e.target.value);
                        }}
                    />
                </div>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
                        <p className="text-gray-600 mt-4 text-lg font-medium">Loading faculty members...</p>
                    </div>
                </div>
            ) : (
                <FacultyTable faculty={faculty} />
            )}

            {/* Pagination */}
            {!loading && totalPages > 0 && (
                <div className="flex items-center justify-between mt-8 bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="flex items-center gap-2 px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                    </button>

                    <div className="flex items-center gap-4">
                        <span className="text-gray-700 font-medium">
                            Page <span className="text-2xl font-bold text-indigo-600">{page}</span> of{" "}
                            <span className="text-2xl font-bold text-indigo-600">{totalPages}</span>
                        </span>
                        <div className="h-8 w-px bg-gray-300"></div>
                        <span className="text-gray-600">
                            Total: <span className="font-semibold text-indigo-600">{total}</span> member{total !== 1 ? "s" : ""}
                        </span>
                    </div>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className="flex items-center gap-2 px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                    >
                        Next
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}
