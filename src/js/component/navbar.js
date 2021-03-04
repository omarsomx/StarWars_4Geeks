import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import logoStarWars from "../../img/logo-star-wars.png";

export const Navbar = () => {
	const [show, setShow] = useState("");
	const [expanded, setExpanded] = useState(false);
	const { store, actions } = useContext(Context);

	function handleDropDown() {
		show == "" ? setShow("show") : setShow("");
		setExpanded(!expanded);
	}

	return (
		<div className="navbar navbar-light bg-light fixed-top">
			<div className="container d-flex justify-content-around">
				<Link to="/">
					<img className="navbar-brand" width="120" height="auto" src={logoStarWars} />
				</Link>

				<div className="ml-auto">
					<div className={`dropdown ${show}`}>
						<button
							className="btn btn-dark dropdown-toggle"
							type="button"
							id="dropdownMenuButton"
							data-toggle="dropdown"
							aria-haspopup="true"
							onClick={() => {
								handleDropDown();
							}}
							aria-expanded={expanded}>
							Favorites <span className="badge badge-light">{store.favorites.length}</span>
						</button>
						<div className={`dropdown-menu ${show}`} aria-labelledby="dropdownMenuButton">
							<ul>
								{store.favorites.length > 0 ? (
									store.favorites.map(favorite => {
										return (
											<li
												key={favorite.uid}
												className="dropdown-item d-flex justify-content-between">
												<p className="mx-2">{favorite.name}</p>
												<a
													onClick={() => {
														actions.deleteFavorite(favorite.uid, favorite.name);
													}}>
													<i className="fas fa-trash fa-lg mx-3" />
												</a>
											</li>
										);
									})
								) : (
									<li className="dropdown-item text-center">No favorites</li>
								)}
							</ul>
						</div>
					</div>

					{/* <Link to="/demo">
					<button className="btn btn-primary">Check the Context in action</button>
				</Link> */}
				</div>
			</div>
		</div>
	);
};
