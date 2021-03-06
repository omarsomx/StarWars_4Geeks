import React from "react";

export const Loading = () => {
	return (
		<div className="d-flex justify-content-center mx-auto">
			<div className="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
};

export default Loading;
