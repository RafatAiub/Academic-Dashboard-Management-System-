import { Course } from "@/types/course";
import Link from "next/link";

interface Props {
    courses: Course[];
}

export default function CourseTable({ courses }: Props) {
    return (
        <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-700">Code</th>
                        <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-700">Name</th>
                        <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-700">Credits</th>
                        <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-700">Department</th>
                        <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-700">Instructor</th>
                        <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="p-4 text-center text-gray-500">
                                No courses found
                            </td>
                        </tr>
                    ) : (
                        courses.map((c) => (
                            <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-3 border-b border-gray-200">
                                    <Link
                                        href={`/courses/${c.id}`}
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        {c.code}
                                    </Link>
                                </td>
                                <td className="p-3 border-b border-gray-200 text-gray-800">{c.name}</td>
                                <td className="p-3 border-b border-gray-200 text-gray-600">{c.credits}</td>
                                <td className="p-3 border-b border-gray-200 text-gray-600">{c.department}</td>
                                <td className="p-3 border-b border-gray-200 text-gray-600">{c.instructor || "TBA"}</td>
                                <td className="p-3 border-b border-gray-200">
                                    <Link
                                        href={`/courses/${c.id}`}
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
