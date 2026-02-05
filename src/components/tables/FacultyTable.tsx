import { Faculty } from "@/types/faculty";
import Link from "next/link";

interface Props {
    faculty: Faculty[];
}

export default function FacultyTable({ faculty }: Props) {
    return (
        <div className="mt-6 overflow-hidden rounded-2xl shadow-xl border-2 border-gray-200">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white">
                    <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                        <tr>
                            <th className="p-4 text-left font-bold text-sm uppercase tracking-wider">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Name
                                </div>
                            </th>
                            <th className="p-4 text-left font-bold text-sm uppercase tracking-wider">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Email
                                </div>
                            </th>
                            <th className="p-4 text-left font-bold text-sm uppercase tracking-wider">Department</th>
                            <th className="p-4 text-left font-bold text-sm uppercase tracking-wider">Specialization</th>
                            <th className="p-4 text-left font-bold text-sm uppercase tracking-wider">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                    Actions
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {faculty.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-12 text-center">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="p-6 bg-gray-100 rounded-full">
                                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xl font-semibold text-gray-600">No faculty members found</p>
                                            <p className="text-gray-400 mt-1">Add a faculty member to get started</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            faculty.map((f, index) => (
                                <tr
                                    key={f.id}
                                    className={`border-b border-gray-200 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                        }`}
                                >
                                    <td className="p-4">
                                        <Link
                                            href={`/faculty/${f.id}`}
                                            className="group flex items-center gap-3"
                                        >
                                            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform shadow-md">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <span className="text-indigo-600 hover:text-indigo-800 font-semibold group-hover:underline">
                                                {f.name}
                                            </span>
                                        </Link>
                                    </td>
                                    <td className="p-4">
                                        <a
                                            href={`mailto:${f.email}`}
                                            className="text-gray-700 hover:text-indigo-600 transition-colors flex items-center gap-2 group"
                                        >
                                            <svg className="w-4 h-4 text-gray-400 group-hover:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            {f.email}
                                        </a>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            {f.department}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-gray-600 text-sm flex items-center gap-2">
                                            <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                            </svg>
                                            {f.specialization}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <Link
                                            href={`/faculty/${f.id}`}
                                            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 transform font-medium"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
