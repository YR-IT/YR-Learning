import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InstructorShowcase() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const [screenSize, setScreenSize] = useState('desktop');

	// Instructor data with enhanced styling
	const instructors = [
		{
			name: "Vinay Sheoran",
			role: "Senior Data Science Trainer",
			avatar: "/images/trainer1.jpg",
			bio:
				"Ex-Data Scientist at Flipkart & Publicis Re:Sources, with 8+ years of expertise in Machine Learning, Artificial Intelligence, and Big Data Analytics.",
			tags: ["System Design", "DSA", "Java", "Mentorship"],
			accent: "from-blue-500 via-indigo-500 to-purple-500",
		},
		{
			name: "Sumit Kumar",
			role: "Web Development Instructor",
			avatar: "/images/trainer3.jpg",
			bio:
				"Former Full Stack Developer at DRDO & PwC. Expert in React.js, Node.js, database design, and scalable web architecture.",
			tags: ["Web", "Cloud", "Career", "Code Reviews"],
			accent: "from-emerald-500 via-teal-500 to-sky-500",
		},
		{
			name: "Isha",
			role: "UI/UX Design Specialist",
			avatar: "/images/trainer2.jpg",
			bio:
				"Professional Designer at MAAC with 6+ years of experience in creating user-centric interfaces, visual design systems, and responsive mobile/web UI.",
			tags: ["UI/UX", "Design Systems", "Wireframing", "User Research"],
			accent: "from-pink-500 via-rose-500 to-red-500",
		},
		{
			name: "Ridham",
			role: "Data Science Trainer",
			avatar: "/images/Trainer5.jpeg",
			bio:
				"Ex-Data Science Trainee at Creator's Bite US. Learn from industry expert and gain hands-on experience in Data Science, Machine Learning, and Analytics.",
			tags: ["Data Science", "Machine Learning", "Analytics", "Python"],
			accent: "from-orange-500 via-amber-500 to-yellow-500",
		},
		{
			name: "Gautam",
			role: "Cyber Security Trainer",
			avatar: "/images/Trainer4.jpeg",
			bio:
				"Penetration tester at YR IT SOLUTION and Cyber Security Practitioner at TCS. Learn from industry expert and gain hands-on experience in Cybersecurity.",
			tags: ["Penetration Testing", "Cyber Security", "Ethical Hacking", "Network Security"],
			accent: "from-cyan-500 via-blue-500 to-indigo-500",
		},
		{
			name: "Vishal",
			role: "Machine Learning Trainer",
			avatar: "/images/Trainer6.jpeg",
			bio:
				"Ex-data analyst at Novateur Electrical and Digital System Pvt Ltd. Learn from industry expert and gain hands-on experience in Machine Learning and AI.",
			tags: ["Machine Learning", "AI", "Data Analysis", "Deep Learning"],
			accent: "from-violet-500 via-purple-500 to-fuchsia-500",
		},
		{
			name: "Aryan Kumar",
			role: "Web Development Trainer",
			avatar: "/images/Trainer7.jpeg",
			bio:
				"Official member of Superteam India and Ex-TA at Coding Ninjas. Learn from industry expert and gain hands-on experience in Web Development.",
			tags: ["Web Development", "React", "Node.js", "Mentorship"],
			accent: "from-green-500 via-emerald-500 to-teal-500",
		},
		{
			name: "Gauri Sharma",
			role: "Machine Learning Trainer",
			avatar: "/images/Trainer8.jpeg",
			bio:
				"AI-ML Trainer at YR IT SOLUTIONS and AI-ML Developer and Researcher at AlonOS Noida. Learn from industry expert and gain hands-on experience in Machine Learning and AI.",
			tags: ["Machine Learning", "AI", "Research", "Deep Learning"],
			accent: "from-rose-500 via-pink-500 to-purple-500",
		},
	];

	// Detect screen size
	useEffect(() => {
		const checkScreenSize = () => {
			const width = window.innerWidth;
			if (width < 768) {
				setScreenSize('mobile');
			} else if (width < 1280) {
				setScreenSize('tablet');
			} else {
				setScreenSize('desktop');
			}
		};

		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);
		return () => window.removeEventListener('resize', checkScreenSize);
	}, []);

	// Get number of instructors to show based on screen size
	const getInstructorCount = () => {
		switch (screenSize) {
			case 'mobile': return 1;
			case 'tablet': return 2;
			case 'desktop': return 3;
			default: return 3;
		}
	};

	// Auto-rotate instructors
	useEffect(() => {
		const interval = setInterval(() => {
			setIsAnimating(true);
			setTimeout(() => {
				setCurrentIndex((prev) => (prev + 1) % instructors.length);
				setIsAnimating(false);
			}, 500);
		}, 4000);

		return () => clearInterval(interval);
	}, []);

	// Get visible instructors based on screen size
	const getVisibleInstructors = () => {
		const instructorCount = getInstructorCount();
		const visibleInstructors = [];
		for (let i = 0; i < instructorCount; i++) {
			const index = (currentIndex + i) % instructors.length;
			visibleInstructors.push({
				...instructors[index],
				displayIndex: i,
			});
		}
		return visibleInstructors;
	};

	const visibleInstructors = getVisibleInstructors();
	const instructorCount = getInstructorCount();

	return (
		<section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden transition-colors duration-300">
			{/* Background decoration
			<div className="absolute inset-0">
				<div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-3xl animate-pulse transition-colors duration-300"></div>
				<div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-400/15 dark:bg-indigo-600/15 rounded-full blur-3xl animate-pulse transition-colors duration-300" style={{ animationDelay: '2s' }}></div>
			</div> */}

			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-12 sm:mb-16">
					<div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-100 dark:border-gray-700 rounded-full mb-4 sm:mb-6 shadow-sm transition-colors duration-300">
						<div className="flex gap-1">
							<div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
							<div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
							<div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
						</div>
						<span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">Expert Instructors</span>
					</div>

					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight transition-all duration-300">
						Meet Our Expert Instructors
					</h2>
					<p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-4 transition-colors duration-300">
						Learn from industry professionals with years of experience at top companies
					</p>
				</div>

				{/* Instructors Display */}
				<div className="relative overflow-hidden">
					<div className={`grid gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto ${
						instructorCount === 1 ? 'grid-cols-1 max-w-md' : 
						instructorCount === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-4xl' : 
						'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
					}`}>
						{visibleInstructors.map((instructor, index) => (
							<div
								key={`${instructor.name}-${currentIndex}-${index}`}
								className={`
									bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-white/50 dark:border-gray-700/50
									hover:shadow-2xl hover:scale-105 transition-all duration-500
									relative overflow-hidden group cursor-pointer
									${isAnimating ? 'animate-slideLeft' : 'animate-slideInRight'}
								`}
								style={{
									animationDelay: `${index * 0.1}s`,
								}}
							>
								{/* Gradient border effect */}
								<div className={`absolute inset-0 bg-gradient-to-br ${instructor.accent} opacity-0 group-hover:opacity-20 rounded-xl sm:rounded-2xl transition-opacity duration-500`}></div>
								
								{/* Accent line */}
								<div className={`absolute top-0 left-0 h-2 w-full bg-gradient-to-r ${instructor.accent} transition-all duration-300 group-hover:h-3`} />

								{/* Content */}
								<div className="relative z-10">
									{/* Portrait */}
									<div className="flex justify-center mb-4 sm:mb-6">
										<div className="relative">
											<div className={`w-20 sm:w-24 h-20 sm:h-24 rounded-2xl p-1.5 bg-gradient-to-br ${instructor.accent} shadow-lg`}>
												<img
													src={instructor.avatar}
													alt={instructor.name}
													className="w-full h-full rounded-xl object-cover border-2 border-white dark:border-gray-200 shadow-lg transition-colors duration-300"
												/>
											</div>
											{/* Online status */}
											<div className="absolute -bottom-0.5 sm:-bottom-1 -right-0.5 sm:-right-1 w-3 sm:w-5 h-3 sm:h-5 bg-green-500 border-2 border-white dark:border-gray-200 rounded-full transition-colors duration-300"></div>
										</div>
									</div>
									
									{/* Info */}
									<div className="text-center mb-4 sm:mb-6">
										<h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base lg:text-lg mb-1 transition-colors duration-300">
											{instructor.name}
										</h4>
										<p className={`bg-gradient-to-r ${instructor.accent} bg-clip-text text-transparent font-medium text-xs sm:text-sm mb-3`}>
											{instructor.role}
										</p>
									</div>
									
									{/* Bio content */}
									<div className="mb-4 sm:mb-6">
										<svg className="w-6 sm:w-8 h-6 sm:h-8 text-blue-200 dark:text-blue-600 mb-2 mx-auto transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
											<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
										</svg>
										<p className="text-gray-700 dark:text-gray-300 leading-relaxed text-xs sm:text-sm text-center transition-colors duration-300">
											{instructor.bio}
										</p>
									</div>
									
									{/* Tags */}
									<div className="flex flex-wrap gap-2 justify-center">
										{instructor.tags?.map((tag, tagIndex) => (
											<span
												key={tag}
												className={`px-2 sm:px-3 py-1 bg-gradient-to-r ${instructor.accent} text-white text-xs font-semibold rounded-full shadow-sm hover:shadow-md transition-all duration-300 cursor-default`}
											>
												{tag}
											</span>
										))}
									</div>
								</div>

								{/* Decorative element */}
								<div className={`absolute bottom-0 right-0 w-16 h-16 rounded-tl-3xl bg-gradient-to-br ${instructor.accent} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
							</div>
						))}
					</div>

					{/* Progress indicators */}
					<div className="flex justify-center mt-6 sm:mt-8 gap-1 sm:gap-2 px-4">
						{instructors.map((_, index) => {
							const isActive = index >= currentIndex && index < currentIndex + instructorCount;
							const isNext = index === (currentIndex + instructorCount) % instructors.length;
							
							return (
								<div
									key={index}
									className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 ${
										isActive
											? 'w-6 sm:w-8 bg-blue-500'
											: isNext
											? 'w-4 sm:w-6 bg-blue-300 dark:bg-blue-600'
											: 'w-1.5 sm:w-2 bg-gray-300 dark:bg-gray-600'
									}`}
								/>
							);
						})}
					</div>
				</div>
			</div>

			<style jsx>{`
				@keyframes slideInRight {
					0% {
						opacity: 0;
						transform: translateX(100px);
					}
					100% {
						opacity: 1;
						transform: translateX(0);
					}
				}
				
				@keyframes slideLeft {
					0% {
						opacity: 1;
						transform: translateX(0);
					}
					100% {
						opacity: 0;
						transform: translateX(-100px);
					}
				}
				
				.animate-slideInRight {
					animation: slideInRight 0.7s ease-out forwards;
				}
				
				.animate-slideLeft {
					animation: slideLeft 0.5s ease-in forwards;
				}
			`}</style>
		</section>
	);
}
