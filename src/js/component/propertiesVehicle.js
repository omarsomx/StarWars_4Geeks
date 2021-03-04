import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const PropertiesVehicle = props => {
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
			<li className="text-muted">Model: {detail.properties ? detail.properties.model : "model"}</li>
			<li className="text-muted">
				vehicle class: {detail.properties ? detail.properties.vehicle_class : "vehicle class"}
			</li>
			<li className="text-muted">
				Cargo capacity: {detail.properties ? detail.properties.cargo_capacity : "cargo capacity"}
			</li>
		</ul>
	);
};

export default PropertiesVehicle;
PropertiesVehicle.propTypes = {
	url: PropTypes.string
};
