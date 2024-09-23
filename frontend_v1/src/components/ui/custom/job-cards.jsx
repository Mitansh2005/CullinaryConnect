import { HoverEffect } from "@/components/ui/card-hover-effect";
export function  JobCards({projects}) {
	return (
		<section className="container mx-auto">
			<HoverEffect
				items={projects}
				className="grid grid-cols-1 gap-4 sm:grid-cols-2"
			></HoverEffect>
		</section>
	);
}
