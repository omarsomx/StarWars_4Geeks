import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import logoStarWars from "../../img/logo-star-wars.png";

export const Navbar = () => {
	const [show, setShow] = useState("");
	const [expanded, setExpanded] = useState(false);
	const { store, actions } = useContext(Context);
	const [favorites, setFavorites] = useState([]);

	function handleDropDown() {
		show == "" ? setShow("show") : setShow("");
		setExpanded(!expanded);
	}

	useEffect(
		() => {
			setFavorites(createFavorites());
		},
		[store.people, store.planets, store.vehicles]
	);

	function createFavorites() {
		let favorites = [];
		if (store.people) {
			store.people.results.map(char => {
				if (char.favorite) {
					favorites.push({ name: char.name, uid: char.uid, path: "people" });
				}
			});
		}
		if (store.planets) {
			store.planets.results.map(planet => {
				if (planet.favorite) {
					favorites.push({ name: planet.name, uid: planet.uid, path: "planets" });
				}
			});
		}
		if (store.vehicles) {
			store.vehicles.results.map(vehicle => {
				if (vehicle.favorite) {
					favorites.push({ name: vehicle.name, uid: vehicle.uid, path: "vehicles" });
				}
			});
		}
		return favorites;
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
							Favorites <span className="badge badge-light">{favorites.length}</span>
						</button>
						<div className={`dropdown-menu ${show}`} aria-labelledby="dropdownMenuButton">
							<ul>
								{favorites.length > 0 ? (
									favorites.map((favorite, index) => {
										return (
											<li key={index} className="dropdown-item d-flex justify-content-between">
												<p className="mx-2">{favorite.name}</p>
												<a
													onClick={() => {
														actions.toggleFavorite(favorite.uid, favorite.path);
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
				</div>
			</div>
		</div>
	);
};
