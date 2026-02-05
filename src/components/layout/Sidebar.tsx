import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="w-64 border-r min-h-screen bg-gray-50 p-4">
            <nav className="space-y-2">
                <Link href="/" className="block font-medium">
                    Dashboard
                </Link>
                <Link href="/students" className="block">
                    Students
                </Link>
                <Link href="/courses" className="block">
                    Courses
                </Link>
                <Link href="/faculty" className="block">
                    Faculty
                </Link>
            </nav>
        </aside>
    );
}
