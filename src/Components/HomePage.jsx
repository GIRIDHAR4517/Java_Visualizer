import { useNavigate } from "react-router-dom";
import { ArrowRight, Code2, BookOpen, Zap, Users } from "lucide-react";

function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Code2,
      title: "Write Code",
      description: "Write Java code in a modern, intuitive editor with syntax highlighting",
    },
    {
      icon: Zap,
      title: "Execute Instantly",
      description: "Compile and run your code with real-time execution feedback",
    },
    {
      icon: BookOpen,
      title: "Visualize Execution",
      description: "See stack and heap memory changes step by step",
    },
    {
      icon: Users,
      title: "Learn Together",
      description: "Track your progress and learn from interactive visualizations",
    },
  ];

  const courses = [
    {
      id: 1,
      title: "Java Basics",
      description: "Learn fundamentals of Java programming",
      level: "Beginner",
      lessons: 12,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      title: "OOP Concepts",
      description: "Master Object-Oriented Programming principles",
      level: "Intermediate",
      lessons: 15,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 3,
      title: "Data Structures",
      description: "Understand arrays, lists, trees, and graphs",
      level: "Advanced",
      lessons: 18,
      color: "from-pink-500 to-pink-600",
    },
    {
      id: 4,
      title: "Algorithms",
      description: "Solve problems with optimal algorithms",
      level: "Advanced",
      lessons: 20,
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-2xl">
              <Code2 size={48} className="text-white" />
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Java Code Visualizer
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
            Write, compile, and visualize Java code execution step by step. Understand how your code runs at the deepest level.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => navigate("/editor")}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-lg font-bold text-lg shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
            >
              Start Coding Now
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              className="px-8 py-4 bg-slate-700 hover:bg-slate-600 rounded-lg font-bold text-lg shadow-lg transition-all duration-200 border border-slate-600 hover:border-emerald-500"
            >
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 backdrop-blur">
              <div className="text-3xl font-bold text-emerald-400">1000+</div>
              <div className="text-slate-400 text-sm">Active Users</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 backdrop-blur">
              <div className="text-3xl font-bold text-teal-400">50+</div>
              <div className="text-slate-400 text-sm">Code Examples</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 backdrop-blur">
              <div className="text-3xl font-bold text-cyan-400">24/7</div>
              <div className="text-slate-400 text-sm">Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-emerald-500 transition-all duration-300 group hover:shadow-xl hover:shadow-emerald-500/20"
                >
                  <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg w-fit mb-4 group-hover:from-emerald-500/30 group-hover:to-teal-500/30 transition-all">
                    <Icon size={24} className="text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Featured Courses
            </h2>
            <p className="text-slate-400 text-lg">Master Java programming with our comprehensive courses</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="group bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-emerald-500 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/20 hover:scale-105 cursor-pointer"
              >
                {/* Course Header */}
                <div className={`h-32 bg-gradient-to-br ${course.color} opacity-80 group-hover:opacity-100 transition-opacity relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                  <div className="absolute bottom-0 right-0 text-6xl opacity-20 font-bold">
                    {course.id}
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-slate-700 rounded-full text-xs font-semibold text-emerald-400">
                      {course.level}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-slate-400 text-sm mb-4">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                    <span>📚 {course.lessons} Lessons</span>
                  </div>

                  <button className="w-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500 hover:to-teal-600 text-emerald-400 hover:text-white font-semibold py-2 rounded-lg transition-all border border-emerald-500/30 hover:border-emerald-500">
                    Explore Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-slate-300 text-lg mb-8">
            Join thousands of developers who have mastered Java with our interactive visualizer
          </p>
          <button
            onClick={() => navigate("/editor")}
            className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-lg font-bold text-lg shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mx-auto group"
          >
            Launch Code Editor
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8 px-4 bg-slate-900">
        <div className="max-w-6xl mx-auto text-center text-slate-400">
          <p>© 2024 Java Code Visualizer. Learn, Practice, Master Java.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;