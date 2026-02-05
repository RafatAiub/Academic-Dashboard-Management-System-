import { GetServerSideProps } from "next";
import { Student } from "@/types/student";
import { StudentService } from "@/services/student.service";
import Link from "next/link";

interface Props {
    student: Student | null;
    error?: string;
}

export default function StudentDetailPage({ student, error }: Props) {
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
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Edit Student
                    </button>
                    <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                        Delete Student
                    </button>
                </div>
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
