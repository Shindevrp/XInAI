import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Course data
const courses = [
	{
		title: "Foundational AI & Data",
		description: "Python, Statistics, Linear Algebra, Probability, SQL",
		icon: "📊"
	},
	{
		title: "Machine Learning",
		description: "ML algorithms, Scikit-learn, Evaluation, Model Deployment",
		icon: "🤖"
	},
	{
		title: "Deep Learning",
		description: "Neural Nets, CNNs, RNNs, Transformers",
		icon: "🧠"
	},
	{
		title: "MLOps & Industry Stack",
		description: "MLflow, Kubernetes, Docker, CI/CD, Monitoring",
		icon: "⚙️"
	},
	{
		title: "NLP",
		description: "Natural Language Processing",
		icon: "📝"
	},
	{
		title: "Computer Vision",
		description: "Vision models, CNNs, Object Detection",
		icon: "👁️"
	},
	{
		title: "Generative AI",
		description: "GANs, Diffusion Models, LLMs",
		icon: "🎨"
	}
];


// Simple UI components
function Button({ children, ...props }) {
	return (
		<button
			className="px-4 py-2 rounded hover:bg-gray-100 transition focus:outline-none"
			{...props}
		>
			{children}
		</button>
	);
}
function Card({ children, ...props }) {
	return <div {...props}>{children}</div>;
}
function CardContent({ children, ...props }) {
	return <div {...props}>{children}</div>;
}

function CoursesPage() {
	const [toast, setToast] = useState("");
	const router = useRouter();
	useEffect(() => {
			// Supabase auth check: redirect to login if no session
			async function checkSession() {
				const { data } = await supabase.auth.getSession();
				if (!data.session) {
					router.replace("/login");
				}
			}
			checkSession();
	}, [router]);

	const handleCardClick = () => {
		setToast("We are working on this course and will update soon.");
		setTimeout(() => setToast(""), 4000);
	};

		return (
			<div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-blue-100">
			{/* Navigation Bar */}
			<nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
					<span className="text-xl font-bold text-gray-800 tracking-tight">InAI</span>
					<div className="flex space-x-4">
						<Link href="/" passHref legacyBehavior>
							<a><Button>Home</Button></a>
						</Link>
						<Link href="/courses" passHref legacyBehavior>
							<a><Button>Courses</Button></a>
						</Link>
						<Link href="/community" passHref legacyBehavior>
							<a>
								<Button className="group relative">
									<span className="group-hover:text-blue-600 transition">Community</span>
									<span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
								</Button>
							</a>
						</Link>
						<Link href="/profile" passHref legacyBehavior>
							<a><Button>Profile</Button></a>
						</Link>
					</div>
				</div>
			</nav>

			{/* Header Section */}
					<header className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12 text-center text-white shadow-lg">
						<h2 className="text-4xl font-extrabold mb-2 tracking-tight drop-shadow-lg">Explore AI Learning Tracks</h2>
						<p className="text-lg max-w-2xl mx-auto opacity-90">Learn step by step, from foundational concepts to advanced AI industry practices.</p>
					</header>

			{/* Course Grid */}
					<main className="flex-1">
						<div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
							{courses.map((course) => (
								<motion.div
									key={course.title}
									whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
									whileTap={{ scale: 0.98 }}
									transition={{ type: "spring", stiffness: 300, damping: 20 }}
								>
									<Card
										className="cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl border-t-4 border-blue-600 bg-white flex flex-col items-center text-center p-8"
										onClick={handleCardClick}
										tabIndex={0}
										role="button"
										aria-label={`Learn more about ${course.title}`}
									>
										<div className="text-5xl mb-4">{course.icon}</div>
										<CardContent>
											<h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
											<p className="text-gray-600 text-base leading-relaxed">{course.description}</p>
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

export default CoursesPage;
