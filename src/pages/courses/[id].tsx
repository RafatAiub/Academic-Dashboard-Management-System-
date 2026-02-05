import { GetServerSideProps } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { Course } from "@/types/course";
import { CourseService } from "@/services/course.service";
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

                        {/* Actions */}
                        <div className="mt-6 flex gap-4">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Edit Course
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                            >
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
