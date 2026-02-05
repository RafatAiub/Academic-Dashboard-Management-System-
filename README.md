# Academic Management Dashboard

A modern, full-stack academic management system built with Next.js, TypeScript, and Tailwind CSS. Features complete CRUD operations for students and courses with type-safe validation, server-side rendering, and a beautiful responsive UI.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 📚 Student Management
- List all students with pagination and search
- Create new students with validated forms
- View detailed student profiles
- Edit student information
- Delete students with confirmation
- GPA tracking and performance badges

### 📖 Course Management
- List all courses with pagination and search
- Create new courses with validated forms
- View detailed course information
- Edit course details
- Delete courses with confirmation
- Track credits, departments, and instructors

### 📊 Dashboard
- Real-time statistics (total students, courses, average GPA)
- Beautiful gradient stat cards
- Quick action links
- Responsive design

## 🛠️ Tech Stack

**Frontend:**
- [Next.js 16](https://nextjs.org/) - React framework with Pages Router
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Axios](https://axios-http.com/) - HTTP client

**Backend:**
- Next.js API Routes - RESTful API
- [Zod](https://zod.dev/) - Schema validation
- In-memory database (mock-db)

**Development:**
- ESLint - Code linting
- Git - Version control

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/RafatAiub/Academic-Dashboard-Management-System-.git
cd academic-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
```
http://localhost:3000
```

## 📁 Project Structure

```
academic-dashboard/
├── src/
│   ├── components/
│   │   ├── forms/           # Reusable form components
│   │   ├── tables/          # Data table components
│   │   ├── modals/          # Modal components
│   │   └── layout/          # Layout components
│   ├── lib/
│   │   ├── mock-db.ts       # In-memory database
│   │   └── validators.ts    # Zod validation schemas
│   ├── pages/
│   │   ├── api/             # API routes
│   │   ├── students/        # Student pages
│   │   ├── courses/         # Course pages
│   │   └── index.tsx        # Dashboard
│   ├── services/            # API service layer
│   └── types/               # TypeScript interfaces
├── db.json                  # Mock database
└── README.md
```

## 🎯 API Endpoints

### Students
- `GET /api/students` - List students (with pagination & search)
- `POST /api/students` - Create student
- `GET /api/students/[id]` - Get student by ID
- `PUT /api/students/[id]` - Update student
- `DELETE /api/students/[id]` - Delete student

### Courses
- `GET /api/courses` - List courses (with pagination & search)
- `POST /api/courses` - Create course
- `GET /api/courses/[id]` - Get course by ID
- `PUT /api/courses/[id]` - Update course
- `DELETE /api/courses/[id]` - Delete course

## 🔒 Validation

All forms and API endpoints use **Zod** for type-safe validation:

**Student Schema:**
- Name: min 2 characters
- Year: integer
- Course: min 2 characters
- GPA: 0.0 - 4.0

**Course Schema:**
- Code: min 2 characters
- Name: min 3 characters
- Credits: 1-6 integer
- Department: min 2 characters
- Instructor: optional

## 🎨 Key Features

### Type Safety
- Full TypeScript coverage
- Zod runtime validation
- Type inference from schemas

### Reusable Components
- StudentForm (create & edit)
- CourseForm (create & edit)
- DeleteConfirmModal
- StudentTable
- CourseTable

### User Experience
- Loading states
- Error handling
- Confirmation modals
- Responsive design
- Professional styling

### Architecture
- Service layer abstraction
- Separation of concerns
- Clean code principles
- RESTful API design

## 📸 Screenshots

### Dashboard
![Dashboard](docs/dashboard.png)

### Student Management
![Students](docs/students.png)

### Course Management
![Courses](docs/courses.png)

## 🧪 Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🚢 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/RafatAiub/Academic-Dashboard-Management-System-)

1. Push your code to GitHub
2. Import your repository to Vercel
3. Deploy with one click

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Rafat Aiub**
- GitHub: [@RafatAiub](https://github.com/RafatAiub)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Validated with [Zod](https://zod.dev/)

---

**⭐ If you find this project useful, please consider giving it a star!**
