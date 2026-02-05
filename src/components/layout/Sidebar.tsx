import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="w-64 border-r min-h-screen bg-white p-4">
            <div className="mb-8">
                <h1 className="text-xl font-bold text-gray-800">Academic Portal</h1>
            </div>
            <nav className="space-y-1">
                <Link
                    href="/"
                    className="block px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                    Dashboard
                </Link>
                <Link
                    href="/students"
                    className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                    Students
                </Link>
                <Link
                    href="/courses"
                    className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                    Courses
                </Link>
                <Link
                    href="/faculty"
                    className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                    Faculty
                </Link>
            </nav>
        </aside>
    );
}
