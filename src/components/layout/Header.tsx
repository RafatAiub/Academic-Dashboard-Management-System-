import Link from "next/link";

export default function Header() {
    return (
        <header className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white">
            <Link href="/" className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                Academic Dashboard
            </Link>
            <nav className="flex items-center gap-6 text-gray-700 font-medium">
                <Link href="/students" className="hover:text-blue-600 transition-colors duration-200">
                    Students
                </Link>
                <Link href="/courses" className="hover:text-blue-600 transition-colors duration-200">
                    Courses
                </Link>
                <Link href="/faculty" className="hover:text-blue-600 transition-colors duration-200">
                    Faculty
                </Link>
                <Link href="/enrollments" className="hover:text-blue-600 transition-colors duration-200">
                    Enrollments
                </Link>
            </nav>
        </header>
    );
}
