import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import CardDetail from "../component/cardDetail";
import { urlVehicles } from "../component/helpers.js";
import millenniumfalconImg from "../../img/millennium-falcon.jpg";

function VehicleDetail() {
	const { store, actions } = useContext(Context);
	const [detail, setDetail] = useState({});
	let { id } = useParams();

	useEffect(() => {
		fetch(urlVehicles + "/" + id)
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
		{ title: "Model", content: detail.properties ? detail.properties.model : "" },
		{ title: "Vehicle Class", content: detail.properties ? detail.properties.vehicle_class : "" },
		{ title: "Length", content: detail.properties ? detail.properties.length : "" },
		{ title: "Manufacturer", content: detail.properties ? detail.properties.manufacturer : "" },
		{ title: "Cargo capacity", content: detail.properties ? detail.properties.cargo_capacity : "" },
		{ title: "Consumables", content: detail.properties ? detail.properties.consumables : "" }
	];

	return detail.properties && detail.description ? (
		<CardDetail
			image={millenniumfalconImg}
			title={detail.properties.name}
			description={
				detail.description +
				"\n" +
				"Passengers: " +
				detail.properties.passengers +
				"." +
				"\n" +
				"Crew: " +
				detail.properties.crew +
				"." +
				"\n" +
				"Cost in credits: " +
				detail.properties.cost_in_credits
			}
			moreDetails={moreDetails}
		/>
	) : (
		"Not found"
	);
}

export default VehicleDetail;
VehicleDetail.propTypes = {
	id: PropTypes.string
};
