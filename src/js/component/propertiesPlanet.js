import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const PropertiesPlanet = props => {
	const [detail, setDetail] = useState({});

	useEffect(() => {
		fetch(props.url)
			.then(res => res.json())
			.then(data => {
				setDetail(data.result);
			})
			.catch(err => console.error(err));
	}, []);
	return (
		<ul className="list-unstyled">
			<li className="text-muted">
				Population: {detail.properties ? detail.properties.population : "population"}
			</li>
			<li className="text-muted">Climate: {detail.properties ? detail.properties.climate : "climate"}</li>
			<li className="text-muted">Terrain: {detail.properties ? detail.properties.terrain : "terrain"}</li>
		</ul>
	);
};

export default PropertiesPlanet;
PropertiesPlanet.propTypes = {
	url: PropTypes.string
};
