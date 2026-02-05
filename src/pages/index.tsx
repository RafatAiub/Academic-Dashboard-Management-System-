import { useEffect, useState } from "react";
import Link from "next/link";
import { StudentService } from "@/services/student.service";
import { CourseService } from "@/services/course.service";
import { FacultyService } from "@/services/faculty.service";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalFaculty: 0,
    averageGPA: 0,
    loading: true
  });

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const [studentsRes, coursesRes, facultyRes] = await Promise.all([
        StudentService.list({ page: 1, limit: 1000 }),
        CourseService.list({ page: 1, limit: 1000 }),
        FacultyService.list({ page: 1, limit: 1000 })
      ]);

      const students = studentsRes.data;
      const avgGPA = students.length > 0
        ? students.reduce((sum, s) => sum + s.gpa, 0) / students.length
        : 0;

      setStats({
        totalStudents: studentsRes.meta.total,
        totalCourses: coursesRes.meta.total,
        totalFaculty: facultyRes.meta.total,
        averageGPA: avgGPA,
        loading: false
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
      setStats(prev => ({ ...prev, loading: false }));
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Academic Management Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your academic management system</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Students */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Students</p>
              <p className="text-3xl font-bold mt-2">
                {stats.loading ? "..." : stats.totalStudents}
              </p>
            </div>
            <div className="bg-blue-400 bg-opacity-30 rounded-full p-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <Link href="/students" className="mt-4 inline-block text-sm text-blue-100 hover:text-white">
            View all students →
          </Link>
        </div>

        {/* Total Courses */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Courses</p>
              <p className="text-3xl font-bold mt-2">
                {stats.loading ? "..." : stats.totalCourses}
              </p>
            </div>
            <div className="bg-green-400 bg-opacity-30 rounded-full p-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <Link href="/courses" className="mt-4 inline-block text-sm text-green-100 hover:text-white">
            View all courses →
          </Link>
        </div>

        {/* Total Faculty */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Total Faculty</p>
              <p className="text-3xl font-bold mt-2">
                {stats.loading ? "..." : stats.totalFaculty}
              </p>
            </div>
            <div className="bg-orange-400 bg-opacity-30 rounded-full p-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <Link href="/faculty" className="mt-4 inline-block text-sm text-orange-100 hover:text-white">
            View all faculty →
          </Link>
        </div>

        {/* Average GPA */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Average GPA</p>
              <p className="text-3xl font-bold mt-2">
                {stats.loading ? "..." : stats.averageGPA.toFixed(2)}
              </p>
            </div>
            <div className="bg-purple-400 bg-opacity-30 rounded-full p-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <p className="mt-4 text-sm text-purple-100">
            Across all students
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/students"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <div className="bg-blue-100 rounded-lg p-3 mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Manage Students</h3>
              <p className="text-sm text-gray-600">Add, edit, or view students</p>
            </div>
          </Link>

          <Link
            href="/courses"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
          >
            <div className="bg-green-100 rounded-lg p-3 mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Manage Courses</h3>
              <p className="text-sm text-gray-600">Add, edit, or view courses</p>
            </div>
          </Link>

          <Link
            href="/faculty"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors"
          >
            <div className="bg-orange-100 rounded-lg p-3 mr-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Manage Faculty</h3>
              <p className="text-sm text-gray-600">Add, edit, or view faculty</p>
            </div>
          </Link>
        </div>
      </div>

      {/* System Info */}
      <div className="mt-8 bg-gray-50 rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">System Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Version:</span>
            <span className="ml-2 font-medium text-gray-800">1.0.0</span>
          </div>
          <div>
            <span className="text-gray-600">Last Updated:</span>
            <span className="ml-2 font-medium text-gray-800">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
