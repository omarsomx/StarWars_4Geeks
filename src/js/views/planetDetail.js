import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import CardDetail from "../component/cardDetail";
import { urlPlanets } from "../component/helpers.js";
import TatooineImg from "../../img/tatooinePlanet.jpg";

function CharacterDetail() {
	const { store, actions } = useContext(Context);
	const [detail, setDetail] = useState({});
	let { id } = useParams();

	useEffect(() => {
		fetch(urlPlanets + "/" + id)
			.then(response => {
				if (response.ok) {
					return response.json();
				}
			})
			.then(data => {
				if (data) {
					setDetail(data.result);
				}
			})
			.catch(err => console.error(err));
	}, []);

	let moreDetails = [
		{ title: "Name", content: detail.properties ? detail.properties.name : "" },
		{ title: "Climate", content: detail.properties ? detail.properties.climate : "" },
		{ title: "Gravity", content: detail.properties ? detail.properties.gravity : "" },
		{ title: "Diameter", content: detail.properties ? detail.properties.diameter : "" },
		{ title: "Rotation period", content: detail.properties ? detail.properties.rotation_period : "" },
		{ title: "Orbital period", content: detail.properties ? detail.properties.orbital_period : "" }
	];

	return detail.properties && detail.description ? (
		<CardDetail
			image={TatooineImg}
			title={detail.properties.name}
			description={
				detail.description +
				"\n" +
				"Population: " +
				detail.properties.population +
				"." +
				"\n" +
				"Terrain: " +
				detail.properties.terrain +
				"." +
				"\n" +
				"Surface water: " +
				detail.properties.surface_water
			}
			moreDetails={moreDetails}
		/>
	) : (
		"Not found"
	);
}

export default CharacterDetail;
CharacterDetail.propTypes = {
	id: PropTypes.string
};
