import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Card from "../component/card";
import PropertiesCharacter from "../component/propertiesCharacter";
import starWarsImg from "../../img/star001.jpeg";
import "../../styles/horizontal-scroll.scss";

function Characters() {
	const { store, actions } = useContext(Context);

	function nextCharacters() {
		actions.loadCharacters(store.characters.next);
	}

	return (
		<div>
			<div className="card p-4 m-3">
				<h3>Characters</h3>

				<div className="card-deck-scrollable flex-nowrap overflow-auto py-3">
					{store.characters
						? store.characters.results.map(character => {
								return (
									<Card
										key={character.name + character.uid}
										uid={character.uid}
										image={starWarsImg}
										title={character.name}
										properties={<PropertiesCharacter url={character.url} />}
										index={character.uid}
										labelButton={"Learn more..."}
									/>
								);
						  })
						: "Loading characters"}
					{store.characters ? (
						<button className="btn btn-light border-0" onClick={nextCharacters}>
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

export default Characters;
