import { Student } from "@/types/student";
import Link from "next/link";

interface Props {
    students: Student[];
}

export default function StudentTable({ students }: Props) {
    return (
        <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-700">Name</th>
                        <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-700">Year</th>
                        <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-700">Course</th>
                        <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-700">GPA</th>
                        <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="p-4 text-center text-gray-500">
                                No students found
                            </td>
                        </tr>
                    ) : (
                        students.map((s) => (
                            <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-3 border-b border-gray-200">
                                    <Link
                                        href={`/students/${s.id}`}
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        {s.name}
                                    </Link>
                                </td>
                                <td className="p-3 border-b border-gray-200 text-gray-600">{s.year}</td>
                                <td className="p-3 border-b border-gray-200 text-gray-600">{s.course}</td>
                                <td className="p-3 border-b border-gray-200 text-gray-600">{s.gpa.toFixed(1)}</td>
                                <td className="p-3 border-b border-gray-200">
                                    <Link
                                        href={`/students/${s.id}`}
                                        className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors inline-block"
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
