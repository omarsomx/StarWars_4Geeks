import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Card from "../component/card";
import Loading from "../component/loading";
import millenniumfalconImg from "../../img/millennium-falcon.jpg";
import "../../styles/horizontal-scroll.scss";
import PropertiesVehicle from "../component/propertiesVehicle";

function Vehicles() {
	const { store, actions } = useContext(Context);

	function nextVehicles() {
		actions.loadVehicles(store.vehicles.next);
	}

	let paginar = store.vehicles ? store.vehicles.next : null;

	return (
		<div>
			<div className="card p-4 m-3">
				<h3>Vehicles</h3>

				<div className="card-deck-scrollable flex-nowrap overflow-auto py-3">
					{store.vehicles ? (
						store.vehicles.results.map(vehicle => {
							return (
								<Card
									key={vehicle.name + vehicle.uid}
									uid={vehicle.uid}
									image={millenniumfalconImg}
									title={vehicle.name}
									properties={<PropertiesVehicle url={vehicle.url} />}
									labelButton={"Learn more..."}
									path="vehicles"
									buttonFavorite={vehicle.favorite}
								/>
							);
						})
					) : (
						<Loading />
					)}
					{paginar ? (
						<button className="btn btn-light border-0" onClick={nextVehicles}>
							<i className="fas fa-plus-circle text-muted" />
						</button>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
}

export default Vehicles;
