import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import starWarsImg from "../../img/star001.jpeg";
import CardDetail from "../component/cardDetail";
import { urlCharacters } from "../component/helpers.js";

function CharacterDetail() {
	const { store, actions } = useContext(Context);
	const [detail, setDetail] = useState({});
	let { id } = useParams();

	useEffect(() => {
		fetch(urlCharacters + "/" + id)
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
		{ title: "Birth year", content: detail.properties ? detail.properties.birth_year : "" },
		{ title: "Gender", content: detail.properties ? detail.properties.gender : "" },
		{ title: "Height", content: detail.properties ? detail.properties.height : "" },
		{ title: "Skin Color", content: detail.properties ? detail.properties.skin_color : "" },
		{ title: "Eye Color", content: detail.properties ? detail.properties.eye_color : "" }
	];

	return detail.properties && detail.description ? (
		<CardDetail
			image={starWarsImg}
			title={detail.properties.name}
			description={detail.description}
			moreDetails={moreDetails}
		/>
	) : (
		<div className="container py-5 my-5">
			<h4 className="text-muted mx-auto">Not found</h4>
		</div>
	);
}

export default CharacterDetail;
CharacterDetail.propTypes = {
	id: PropTypes.string
};
