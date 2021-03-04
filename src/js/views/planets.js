import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Card from "../component/card";
import TatooineImg from "../../img/tatooinePlanet.jpg";
import "../../styles/horizontal-scroll.scss";
import PropertiesPlanet from "../component/propertiesPlanet";

function Planets() {
	const { store, actions } = useContext(Context);

	function nextPlanets() {
		actions.loadPlanets(store.planets.next);
	}

	return (
		<div>
			<div className="card p-4 m-3">
				<h3>Planets</h3>

				<div className="card-deck-scrollable flex-nowrap overflow-auto py-3">
					{store.planets
						? store.planets.results.map(planet => {
								return (
									<Card
										key={planet.name + planet.uid}
										uid={planet.uid}
										image={TatooineImg}
										title={planet.name}
										properties={<PropertiesPlanet url={planet.url} />}
										index={planet.uid}
										labelButton={"Learn more..."}
									/>
								);
						  })
						: "Loading Planets"}
					{store.planets ? (
						<button className="btn btn-light border-0" onClick={nextPlanets}>
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

export default Planets;
