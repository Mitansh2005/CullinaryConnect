import { Link } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";
export function ProfileInfo() {
	return (
		<>
			<div className="flex items-center w-5/12 justify-between">
				<div className="flex flex-col">
					<p>mitanshpithadia76@gmail.com</p>
					<p>+91 9979911077</p>
					<p>Ahmedabad,Gujarat,In</p>
				</div>
				<Link to="/contact_form">
					<div className="hover:cursor-pointer">
						<MdOutlineArrowForwardIos />
					</div>
				</Link>
			</div>
		</>
	);
}
