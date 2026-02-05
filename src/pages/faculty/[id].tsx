import { GetServerSideProps } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { Faculty } from "@/types/faculty";
import { FacultyService } from "@/services/faculty.service";
import { FacultyFormData } from "@/lib/validators";
import FacultyForm from "@/components/forms/FacultyForm";
import DeleteConfirmModal from "@/components/modals/DeleteConfirmModal";
import Link from "next/link";

interface Props {
    faculty: Faculty | null;
    error?: string;
}

export default function FacultyDetailPage({ faculty, error }: Props) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    if (error || !faculty) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 p-6">
                <div className="max-w-2xl mx-auto mt-20">
                    <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-2xl p-8 text-center shadow-xl">
                        <div className="flex justify-center mb-4">
                            <div className="p-4 bg-red-200 rounded-full">
                                <svg className="w-16 h-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-red-800 mb-3">Faculty Member Not Found</h1>
                        <p className="text-red-600 mb-6 text-lg">{error || "The faculty member you're looking for doesn't exist."}</p>
                        <Link
                            href="/faculty"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Faculty
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const handleUpdate = async (data: FacultyFormData) => {
        await FacultyService.update(faculty.id, data);
        setIsEditing(false);
        router.replace(router.asPath);
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await FacultyService.delete(faculty.id);
            router.push("/faculty");
        } catch (error) {
            setIsDeleting(false);
            alert("Failed to delete faculty member");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 p-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/faculty"
                        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6 font-medium hover:gap-3 transition-all duration-200"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Faculty
                    </Link>

                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full filter blur-3xl opacity-10"></div>
                        <div className="relative z-10 flex items-center gap-4">
                            <div className="p-4 bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm">
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold text-white">{faculty.name}</h1>
                                <p className="text-indigo-100 mt-2">Faculty ID: {faculty.id}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {isEditing ? (
                    <div className="space-y-4">
                        <FacultyForm
                            onSubmit={handleUpdate}
                            defaultValues={faculty}
                        />
                        <button
                            onClick={() => setIsEditing(false)}
                            className="text-gray-600 hover:text-gray-800 font-medium flex items-center gap-2 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Cancel Editing
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Faculty Details Card */}
                        <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-xl p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full filter blur-3xl opacity-50 -z-10"></div>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Faculty Information</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                                        <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Full Name
                                    </label>
                                    <p className="text-2xl font-bold text-gray-800">{faculty.name}</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                                        <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Email Address
                                    </label>
                                    <a
                                        href={`mailto:${faculty.email}`}
                                        className="text-xl text-indigo-600 hover:text-indigo-800 hover:underline transition-colors font-medium"
                                    >
                                        {faculty.email}
                                    </a>
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                                        <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        Department
                                    </label>
                                    <p className="text-xl font-semibold text-gray-800">{faculty.department}</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                                        <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                        </svg>
                                        Specialization
                                    </label>
                                    <p className="text-xl font-semibold text-gray-800">{faculty.specialization}</p>
                                </div>

                                {faculty.phone && (
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                                            <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            Phone Number
                                        </label>
                                        <p className="text-xl font-semibold text-gray-800">{faculty.phone}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-8 flex gap-4">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit Faculty
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete Faculty
                            </button>
                        </div>
                    </>
                )}

                {/* Delete Confirmation Modal */}
                <DeleteConfirmModal
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDelete}
                    title="Delete Faculty Member"
                    message={`Are you sure you want to delete ${faculty.name}? This action cannot be undone.`}
                    isDeleting={isDeleting}
                />
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const { id } = context.params!;

    try {
        const faculty = await FacultyService.getById(Number(id));
        return {
            props: { faculty }
        };
    } catch (error) {
        return {
            props: {
                faculty: null,
                error: "Faculty member not found"
            }
        };
    }
};
