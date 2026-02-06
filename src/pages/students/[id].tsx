import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Student } from "@/types/student";
import { EnrollmentWithDetails } from "@/types/enrollment";
import { StudentService } from "@/services/student.service";
import { EnrollmentService } from "@/services/enrollment.service";
import { StudentFormData } from "@/lib/validators";
import StudentForm from "@/components/forms/StudentForm";
import DeleteConfirmModal from "@/components/modals/DeleteConfirmModal";
import Link from "next/link";

interface Props {
    student: Student | null;
    error?: string;
}

export default function StudentDetailPage({ student, error }: Props) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [enrollments, setEnrollments] = useState<EnrollmentWithDetails[]>([]);
    const [loadingEnrollments, setLoadingEnrollments] = useState(true);

    useEffect(() => {
        if (student) {
            fetchEnrollments();
        }
    }, [student]);

    const fetchEnrollments = async () => {
        try {
            const data = await EnrollmentService.getByStudent(student!.id);
            setEnrollments(data);
        } catch (error) {
            console.error("Failed to fetch enrollments:", error);
        } finally {
            setLoadingEnrollments(false);
        }
    };

    if (error || !student) {
        return (
            <div className="p-6">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <h1 className="text-2xl font-semibold text-red-800 mb-2">Student Not Found</h1>
                        <p className="text-red-600 mb-4">{error || "The student you're looking for doesn't exist."}</p>
                        <Link
                            href="/students"
                            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Back to Students
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const handleUpdate = async (data: StudentFormData) => {
        await StudentService.update(student.id, data);
        setIsEditing(false);
        router.replace(router.asPath); // Refresh SSR data
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await StudentService.delete(student.id);
            router.push("/students");
        } catch (error) {
            setIsDeleting(false);
            alert("Failed to delete student");
        }
    };

    return (
        <div className="p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        href="/students"
                        className="text-blue-600 hover:text-blue-700 mb-4 inline-block"
                    >
                        ← Back to Students
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-800">{student.name}</h1>
                    <p className="text-gray-600 mt-1">Student ID: {student.id}</p>
                </div>

                {isEditing ? (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Student</h2>
                        <StudentForm
                            onSubmit={handleUpdate}
                            defaultValues={student}
                        />
                        <button
                            onClick={() => setIsEditing(false)}
                            className="mt-4 text-gray-600 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Student Details Card */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Student Information</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                                    <p className="text-lg text-gray-800">{student.name}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Year</label>
                                    <p className="text-lg text-gray-800">{student.year}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Course</label>
                                    <p className="text-lg text-gray-800">{student.course}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">GPA</label>
                                    <div className="flex items-center gap-2">
                                        <p className="text-lg font-semibold text-gray-800">{student.gpa.toFixed(2)}</p>
                                        <span className={`px-2 py-1 rounded text-sm ${student.gpa >= 3.5 ? 'bg-green-100 text-green-800' :
                                            student.gpa >= 3.0 ? 'bg-blue-100 text-blue-800' :
                                                student.gpa >= 2.5 ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                            }`}>
                                            {student.gpa >= 3.5 ? 'Excellent' :
                                                student.gpa >= 3.0 ? 'Good' :
                                                    student.gpa >= 2.5 ? 'Average' : 'Needs Improvement'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enrollment Statistics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                                <p className="text-blue-600 text-sm font-medium">Total Courses</p>
                                <p className="text-2xl font-bold text-blue-900">{enrollments.length}</p>
                            </div>
                            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                                <p className="text-green-600 text-sm font-medium">Completed</p>
                                <p className="text-2xl font-bold text-green-900">
                                    {enrollments.filter(e => e.status === 'completed').length}
                                </p>
                            </div>
                            <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                                <p className="text-purple-600 text-sm font-medium">Currently Enrolled</p>
                                <p className="text-2xl font-bold text-purple-900">
                                    {enrollments.filter(e => e.status === 'enrolled').length}
                                </p>
                            </div>
                        </div>

                        {/* Enrollment & Course History */}
                        <div className="mt-8">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    Enrollment History
                                </h2>
                                <Link
                                    href={`/enrollments?studentId=${student.id}`}
                                    className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                                >
                                    Manage Enrollments →
                                </Link>
                            </div>

                            {loadingEnrollments ? (
                                <div className="flex justify-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                                </div>
                            ) : enrollments.length === 0 ? (
                                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                                    <p className="text-gray-500">No enrollment history found for this student.</p>
                                </div>
                            ) : (
                                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Course</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Semester</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Grade</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {enrollments.map((enrollment) => (
                                                <tr key={enrollment.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="font-semibold text-gray-900">{enrollment.courseCode}</span>
                                                            <span className="text-sm text-gray-600">{enrollment.courseName}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {enrollment.semester} {enrollment.year}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {enrollment.grade ? (
                                                            <span className={`px-2 py-1 rounded-md text-sm font-bold border ${enrollment.grade === 'A' || enrollment.grade === 'A-' ? 'bg-green-100 text-green-800 border-green-200' :
                                                                enrollment.grade.startsWith('B') ? 'bg-blue-100 text-blue-800 border-blue-200' :
                                                                    enrollment.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                                                        'bg-red-100 text-red-800 border-red-200'
                                                                }`}>
                                                                {enrollment.grade}
                                                            </span>
                                                        ) : (
                                                            <span className="text-gray-400 text-sm">N/A</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm capitalize">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${enrollment.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                            enrollment.status === 'enrolled' ? 'bg-blue-100 text-blue-800' :
                                                                'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {enrollment.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="mt-8 flex gap-4 pt-6 border-t border-gray-100">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-all font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit Student
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="bg-red-600 text-white px-6 py-2.5 rounded-xl hover:bg-red-700 transition-all font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete Student
                            </button>
                        </div>
                    </>
                )}

                {/* Delete Confirmation Modal */}
                <DeleteConfirmModal
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDelete}
                    title="Delete Student"
                    message={`Are you sure you want to delete ${student.name}? This action cannot be undone.`}
                    isLoading={isDeleting}
                />
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const { id } = context.params!;

    try {
        const student = await StudentService.getById(Number(id));
        return {
            props: { student }
        };
    } catch (error) {
        return {
            props: {
                student: null,
                error: "Student not found"
            }
        };
    }
};
