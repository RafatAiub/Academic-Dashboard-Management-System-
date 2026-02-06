import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Course } from "@/types/course";
import { EnrollmentWithDetails } from "@/types/enrollment";
import { CourseService } from "@/services/course.service";
import { EnrollmentService } from "@/services/enrollment.service";
import { CourseFormData } from "@/lib/validators";
import CourseForm from "@/components/forms/CourseForm";
import DeleteConfirmModal from "@/components/modals/DeleteConfirmModal";
import Link from "next/link";

interface Props {
    course: Course | null;
    error?: string;
}

export default function CourseDetailPage({ course, error }: Props) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [enrollments, setEnrollments] = useState<EnrollmentWithDetails[]>([]);
    const [loadingEnrollments, setLoadingEnrollments] = useState(true);

    useEffect(() => {
        if (course) {
            fetchEnrollments();
        }
    }, [course]);

    const fetchEnrollments = async () => {
        try {
            const data = await EnrollmentService.getByCourse(course!.id);
            setEnrollments(data);
        } catch (error) {
            console.error("Failed to fetch enrollments:", error);
        } finally {
            setLoadingEnrollments(false);
        }
    };

    if (error || !course) {
        return (
            <div className="p-6">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <h1 className="text-2xl font-semibold text-red-800 mb-2">Course Not Found</h1>
                        <p className="text-red-600 mb-4">{error || "The course you're looking for doesn't exist."}</p>
                        <Link
                            href="/courses"
                            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Back to Courses
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const handleUpdate = async (data: CourseFormData) => {
        await CourseService.update(course.id, data);
        setIsEditing(false);
        router.replace(router.asPath);
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await CourseService.delete(course.id);
            router.push("/courses");
        } catch (error) {
            setIsDeleting(false);
            alert("Failed to delete course");
        }
    };

    return (
        <div className="p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        href="/courses"
                        className="text-blue-600 hover:text-blue-700 mb-4 inline-block"
                    >
                        ← Back to Courses
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-800">{course.code}: {course.name}</h1>
                    <p className="text-gray-600 mt-1">Course ID: {course.id}</p>
                </div>

                {isEditing ? (
                    <div>
                        <CourseForm
                            onSubmit={handleUpdate}
                            defaultValues={course}
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
                        {/* Course Details Card */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Information</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Course Code</label>
                                    <p className="text-lg font-semibold text-gray-800">{course.code}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Credits</label>
                                    <p className="text-lg text-gray-800">{course.credits}</p>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Course Name</label>
                                    <p className="text-lg text-gray-800">{course.name}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Department</label>
                                    <p className="text-lg text-gray-800">{course.department}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Instructor</label>
                                    <p className="text-lg text-gray-800">{course.instructor || "To Be Assigned"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Enrollment Statistics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                                <p className="text-blue-600 text-sm font-medium">Total Enrolled</p>
                                <p className="text-2xl font-bold text-blue-900">{enrollments.length}</p>
                            </div>
                            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                                <p className="text-green-600 text-sm font-medium">Completed</p>
                                <p className="text-2xl font-bold text-green-900">
                                    {enrollments.filter(e => e.status === 'completed').length}
                                </p>
                            </div>
                            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                                <p className="text-indigo-600 text-sm font-medium">In Progress</p>
                                <p className="text-2xl font-bold text-indigo-900">
                                    {enrollments.filter(e => e.status === 'enrolled').length}
                                </p>
                            </div>
                        </div>

                        {/* Enrolled Students */}
                        <div className="mt-8">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    Enrolled Students
                                </h2>
                                <Link
                                    href={`/enrollments?courseId=${course.id}`}
                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                    Manage Enrollments →
                                </Link>
                            </div>

                            {loadingEnrollments ? (
                                <div className="flex justify-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                </div>
                            ) : enrollments.length === 0 ? (
                                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                                    <p className="text-gray-500">No students are currently enrolled in this course.</p>
                                </div>
                            ) : (
                                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Student Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Semester</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Grade</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {enrollments.map((enrollment) => (
                                                <tr key={enrollment.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <span className="font-semibold text-gray-900">{enrollment.studentName}</span>
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
                                Edit Course
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="bg-red-600 text-white px-6 py-2.5 rounded-xl hover:bg-red-700 transition-all font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete Course
                            </button>
                        </div>
                    </>
                )}

                {/* Delete Confirmation Modal */}
                <DeleteConfirmModal
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDelete}
                    title="Delete Course"
                    message={`Are you sure you want to delete ${course.code}: ${course.name}? This action cannot be undone.`}
                    isLoading={isDeleting}
                />
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const { id } = context.params!;

    try {
        const course = await CourseService.getById(Number(id));
        return {
            props: { course }
        };
    } catch (error) {
        return {
            props: {
                course: null,
                error: "Course not found"
            }
        };
    }
};
