import React from "react";
import { NavLink } from "react-router-dom";
import { active, pending} from "./Nav.module.css";

export const Nav = () => {
	return (
		<nav>
			<NavLink
				to='/home'
				className={({ isActive, isPending }) =>
					isPending ? pending : isActive ? {active} : " "
				}
			>
				Home
			</NavLink>
			<NavLink
				to='/activities'
				className={({ isActive, isPending }) =>
					isPending ? pending : isActive ? {active} : " "
				}
			>
				Create activity
			</NavLink>
			<NavLink
				to='/about'
				className={({ isActive, isPending }) =>
					isPending ? pending : isActive ? {active} : " "
				}
			>
				About
			</NavLink>
		</nav>
	);
};
