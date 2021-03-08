import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Card from "../component/card";
import Loading from "../component/loading";
import PropertiesCharacter from "../component/propertiesCharacter";
import starWarsImg from "../../img/star001.jpeg";
import "../../styles/horizontal-scroll.scss";
import Navbar from "../component/navbar";
import { makeFetch } from "../component/functions";

function Characters() {
	const { store, actions } = useContext(Context);

	function nextCharacters() {
		makeFetch(store.people.next)
			.then(response => {
				if (response) {
					actions.addCharacters(response);
				}
			})
			.catch(err => console.error(err));
	}

	let urlNextPagination = store.people ? store.people.next : null;

	return (
		<div>
			<div className="card p-4 m-3">
				<h3>Character</h3>

				<div className="card-deck-scrollable flex-nowrap overflow-auto py-3">
					{store.people ? (
						store.people.results.map(character => {
							return (
								<Card
									key={character.name + character.uid}
									uid={character.uid}
									image={starWarsImg}
									title={character.name}
									properties={<PropertiesCharacter url={character.url} />}
									labelButton={"Learn more..."}
									path="people"
									buttonFavorite={character.favorite}
								/>
							);
						})
					) : (
						<Loading />
					)}
					{urlNextPagination ? (
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
