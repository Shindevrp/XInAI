import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col">
      {/* Hero Section */}
      <header className="py-20 px-4 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight drop-shadow-lg">Welcome to InAI</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">Your step-by-step journey from AI foundations to industry-ready skills. Learn, build, and join a thriving AI community.</p>
        <div className="flex justify-center gap-4">
          <Link href="/login" className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-50 transition">Log In</Link>
          <Link href="/signup" className="bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-800 transition">Sign Up</Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-4 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center text-center border-t-4 border-blue-600">
          <span className="text-4xl mb-4">📚</span>
          <h3 className="font-bold text-lg mb-2">Structured Learning</h3>
          <p className="text-gray-600">Follow curated tracks from Python basics to advanced AI and MLOps.</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center text-center border-t-4 border-indigo-600">
          <span className="text-4xl mb-4">🤝</span>
          <h3 className="font-bold text-lg mb-2">Community Support</h3>
          <p className="text-gray-600">Join discussions, ask questions, and collaborate with fellow learners.</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center text-center border-t-4 border-blue-400">
          <span className="text-4xl mb-4">🚀</span>
          <h3 className="font-bold text-lg mb-2">Project-Based</h3>
          <p className="text-gray-600">Build real-world projects and showcase your AI skills to employers.</p>
        </div>
      </section>

      {/* Call to Action */}
      <footer className="py-10 text-center text-gray-600 mt-auto">
        <p>Ready to start your AI journey? <Link href="/signup" className="text-blue-700 font-semibold hover:underline">Sign up now</Link>.</p>
        <p className="mt-2 text-xs">&copy; {new Date().getFullYear()} InAI. All rights reserved.</p>
      </footer>
    </div>
  );
}
