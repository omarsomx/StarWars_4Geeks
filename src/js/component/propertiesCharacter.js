import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const PropertiesCharacter = props => {
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
			<li className="text-muted">Gender: {detail.properties ? detail.properties.gender : "gender"}</li>
			<li className="text-muted">
				Hair color: {detail.properties ? detail.properties.hair_color : "hair color"}
			</li>
			<li className="text-muted">Eyes Color: {detail.properties ? detail.properties.eye_color : "eye-color"}</li>
		</ul>
	);
};

export default PropertiesCharacter;
PropertiesCharacter.propTypes = {
	url: PropTypes.string
};
