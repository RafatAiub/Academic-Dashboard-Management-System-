import { GetServerSideProps } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { Student } from "@/types/student";
import { StudentService } from "@/services/student.service";
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

                        {/* Actions */}
                        <div className="mt-6 flex gap-4">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Edit Student
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                            >
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
