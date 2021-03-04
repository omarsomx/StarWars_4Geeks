import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const Card = props => {
	const { store, actions } = useContext(Context);

	return (
		<div className="card">
			<img className="card-img-top" src={props.image} alt="Card image cap" />
			<div className="card-body">
				<h5 className="card-title">{props.title}</h5>
				{props.properties}
				<div className="d-flex justify-content-between">
					<Link to={"/single/" + props.index}>
						<button className="btn btn-dark ">{props.labelButton}</button>
					</Link>
					<button
						className="btn btn-outline-warning border-0"
						onClick={() => actions.addFavorite(props.uid, props.title)}>
						{actions.isFavorite(props.uid, props.title) ? (
							<i className="fas fa-heart border-0" />
						) : (
							<i className="far fa-heart border-0" />
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Card;
Card.propTypes = {
	image: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	index: PropTypes.string,
	labelButton: PropTypes.string,
	uid: PropTypes.string,
	properties: PropTypes.element
};
