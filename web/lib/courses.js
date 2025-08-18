import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Course data (can be moved to a separate file if needed)
const courses = [
	{
		title: "Foundational AI & Data",
		description: "Python, Statistics, Linear Algebra, Probability, SQL"
	},
	{
		title: "Machine Learning",
		description: "ML algorithms, Scikit-learn, Evaluation, Model Deployment"
	},
	{
		title: "Deep Learning",
		description: "Neural Nets, CNNs, RNNs, Transformers"
	},
	{
		title: "MLOps & Industry Stack",
		description: "MLflow, Kubernetes, Docker, CI/CD, Monitoring"
	},
	{
		title: "NLP",
		description: "Natural Language Processing"
	},
	{
		title: "Computer Vision",
		description: "Vision models, CNNs, Object Detection"
	},
	{
		title: "Generative AI",
		description: "GANs, Diffusion Models, LLMs"
	}
];

// Dummy Button, Card, CardContent components for demonstration
// Replace these with your actual UI library components
function Button({ children, ...props }) {
	return (
		<button className="px-4 py-2 rounded hover:bg-gray-100 transition" {...props}>{children}</button>
	);
}
function Card({ children, ...props }) {
	return (
		<div {...props}>{children}</div>
	);
}
function CardContent({ children, ...props }) {
	return (
		<div {...props}>{children}</div>
	);
}

export default function CourseDashboard() {
	const [toast, setToast] = useState("");

	const handleCardClick = (courseTitle) => {
		setToast(`We are working on this course and will update soon.`);
		setTimeout(() => setToast(""), 4000);
	};

	return (
		<div className="min-h-screen flex flex-col bg-gray-50">
			{/* Navigation Bar */}
			<nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
					<span className="text-xl font-bold text-gray-800 tracking-tight">InAI</span>
					<div className="flex space-x-4">
						<Button variant="ghost">Home</Button>
						<Button variant="ghost">Courses</Button>
						<Button variant="ghost">Community</Button>
						<Button variant="ghost">Profile</Button>
					</div>
				</div>
			</nav>

			{/* Header Section */}
			<header className="bg-gradient-to-r from-indigo-50 to-blue-50 py-10 text-center border-b border-gray-200">
				<h2 className="text-3xl font-bold text-gray-800 mb-2">Explore AI Learning Tracks</h2>
				<p className="text-gray-600 max-w-2xl mx-auto">
					Learn step by step, from foundational concepts to advanced AI industry practices.
				</p>
			</header>

			{/* Course Grid */}
			<main className="flex-1">
				<div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
					{courses.map((course, idx) => (
						<motion.div
							key={course.title}
							whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
							whileTap={{ scale: 0.97 }}
							transition={{ type: "spring", stiffness: 300, damping: 20 }}
						>
							<Card
								className="cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl border border-gray-200 bg-white"
								onClick={() => handleCardClick(course.title)}
							>
								<CardContent className="p-6">
									<h3 className="text-lg font-semibold text-gray-800 mb-2">{course.title}</h3>
									<p className="text-gray-500 text-sm leading-relaxed">{course.description}</p>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
				{/* Toast Popup */}
				<AnimatePresence>
					{toast && (
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 30 }}
							transition={{ duration: 0.3 }}
							className="fixed bottom-6 right-6 bg-gray-800 text-white px-5 py-3 rounded-lg shadow-lg text-sm z-50"
						>
							{toast}
						</motion.div>
					)}
				</AnimatePresence>
			</main>

			{/* Footer */}
			<footer className="bg-white border-t border-gray-200 py-6 mt-8">
				<div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-gray-600 text-sm">
					<p>© {new Date().getFullYear()} InAI. All rights reserved.</p>
					<div className="flex space-x-4 mt-2 sm:mt-0">
						<a href="#" className="hover:text-gray-800">Privacy Policy</a>
						<a href="#" className="hover:text-gray-800">Terms of Service</a>
						<a href="#" className="hover:text-gray-800">Contact</a>
					</div>
				</div>
			</footer>
		</div>
	);
}
