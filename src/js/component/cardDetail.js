import React from "react";
import PropTypes from "prop-types";

export const CardDetail = props => {
	return (
		<div className="container py-5 my-5 ">
			<div className="jumbotron bg-white border-0 ">
				<div className="card mb-3">
					<div className="row no-gutters">
						<div className="col-md-4">
							<img src={props.image} className="card-img" alt="starWarsImg" />
						</div>
						<div className="col-md-8">
							<div className="card-body">
								<h5 className="display-4">{props.title}</h5>
								<p className="card-text">{props.description}</p>
							</div>
						</div>
					</div>
				</div>
				<hr className="my-4 bg-warning" />
				<div className="card-deck">
					{props.moreDetails
						? props.moreDetails.map(detail => {
								return (
									<div key={detail.title} className="card-body text-warning">
										<h6 className="card-title font-weight-bold">{detail.title}</h6>
										<p>{detail.content}</p>
									</div>
								);
						  })
						: ""}
				</div>
			</div>
		</div>
	);
};

export default CardDetail;
CardDetail.propTypes = {
	image: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	moreDetails: PropTypes.array
};
