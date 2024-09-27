import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
export const HoverEffect = ({ items, className }) => {
	let [hoveredIndex, setHoveredIndex] = useState(null);

	return (
		<div className={cn("grid grid-cols-2 gap-4 mt-16 p-4 w-full", className)}>
			{items.map((item, idx) => (
				<Link
					href={item?.link}
					key={idx}
					className="relative group  block p-2 h-full w-full"
					onMouseEnter={() => setHoveredIndex(idx)}
					onMouseLeave={() => setHoveredIndex(null)}
				>
					<AnimatePresence>
						{hoveredIndex === idx && (
							<motion.span
								className="absolute inset-0 h-full w-full bg-[#fca311] dark:bg-slate-800/[0.8] block  rounded-3xl"
								layoutId="hoverBackground"
								initial={{ opacity: 0 }}
								animate={{
									opacity: 1,
									transition: { duration: 0.15 },
								}}
								exit={{
									opacity: 0,
									transition: { duration: 0.15, delay: 0.2 },
								}}
							/>
						)}
					</AnimatePresence>
					<Card>
						<CardTitle>{item.title}</CardTitle>
						<CardDescription>{item.description}</CardDescription>
						<CardLocation country_name={item.country} state={item.state} city={item.city} postal_code={item.postal_code}></CardLocation>
						<CardSalary>{item.salary}</CardSalary>
						<CardEmployementType>{item.employment_type}</CardEmployementType>
						<CardPostedDate>{item.posted_date}</CardPostedDate>
					</Card>
				</Link>
			))}
		</div>
	);
};

export const Card = ({ className, children }) => {
	return (
		<div
			className={cn(
				"rounded-2xl h-full w-full p-4 overflow-hidden bg-[#ffffff] border border-transparent dark:border-white/[0.2] group-hover:border-[#fca311] relative z-20",
				className
			)}
		>
			<div className="relative z-50">
				<div className="p-2">{children}</div>
			</div>
		</div>
	);
};
export const CardTitle = ({ className, children }) => {
	return (
		<h4
			className={cn(
				"text-black] font-bold  text-3xl font-custom tracking-wide mt-4",
				className
			)}
		>
			{children}
		</h4>
	);
};
export const CardDescription = ({ className, children }) => {
	return (
		<>
			<div className="mt-3">
				<h1 className="font-bold">Description:</h1>
				<p
					className={cn(
						" text-zinc-800 tracking-wide leading-relaxed text-lg",
						className
					)}
				>
					{children}
				</p>
			</div>
		</>
	);
};
export const CardLocation = ({ className, country_name,state,city,postal_code }) => {
	return (
		<>
			<div className="mt-2 flex">
				<h1 className="font-bold mr-3">Location:</h1>
				<p
					className={cn(
						"text-zinc-800 tracking-wide leading-relaxed text-lg",
						className
					)}
				>
					{country_name}, 
				</p>
				<p
					className={cn(
						"text-zinc-800 tracking-wide leading-relaxed text-lg",
						className
					)}
				>
					{state},
				</p>
				<p
					className={cn(
						"text-zinc-800 tracking-wide leading-relaxed text-lg",
						className
					)}
				>
					{city},
				</p>
				<p
					className={cn(
						"text-zinc-800 tracking-wide leading-relaxed text-lg",
						className
					)}
				>
					{postal_code},
				</p>
			</div>
		</>
	);
};
export const CardSalary = ({ className, children }) => {
	return (
		<>
			<div className="mt-2 flex">
				<h1 className="font-bold mr-3 ">Salary:</h1>
				<p
					className={cn(
						" text-zinc-800 tracking-wide leading-relaxed text-lg",
						className
					)}
				>
					{children}
				</p>
			</div>
		</>
	);
};
export const CardEmployementType = ({ className, children }) => {
	return (
		<>
			<div className="mt-2 flex">
				<h1 className="font-bold mr-3">Job Type:</h1>
				<p
					className={cn(
						" text-zinc-800 tracking-wide leading-relaxed text-lg",
						className
					)}
				>
					{children}
				</p>
			</div>
		</>
	);
};
export const CardPostedDate = ({ className, children }) => {
	return (
		<>
			<div className="mt-2 flex">
        <h1 className="font-bold mr-3">Job Posted:</h1>
				<p
					className={cn(
						" text-zinc-800 tracking-wide leading-relaxed text-lg",
						className
					)}
				>
					{children}
				</p>
			</div>
		</>
	);
};
