import { element } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			people: null,
			planets: null,
			vehicles: null,
			favorites: []
		},
		actions: {
			loadCharacters: url => {
				fetch(url)
					.then(response => {
						if (response.ok) {
							return response.json();
						}
					})
					.then(data => {
						if (data) {
							getActions().saveCharacters(data);
						}
					})
					.catch(err => console.error(err));
			},
			saveCharacters: newResponse => {
				let oldResponse = getStore().people;
				let oldResponseResults = getStore().people ? getStore().people.results : [];

				for (let indexCharacter in newResponse.results) {
					newResponse.results[indexCharacter].favorite = false;
				}
				newResponse.results = [...oldResponseResults, ...newResponse.results];
				setStore({ people: newResponse });
			},

			loadPlanets: url => {
				fetch(url)
					.then(response => {
						if (response.ok) {
							return response.json();
						}
					})
					.then(data => {
						if (data) {
							getActions().savePlanets(data);
						}
					})
					.catch(err => console.error(err));
			},
			savePlanets: newResponse => {
				let oldResponse = getStore().planets;
				let oldResponseResults = getStore().planets ? getStore().planets.results : [];

				for (let indexPlanet in newResponse.results) {
					newResponse.results[indexPlanet].favorite = false;
				}
				newResponse.results = [...oldResponseResults, ...newResponse.results];
				setStore({ planets: newResponse });
			},
			loadVehicles: url => {
				fetch(url)
					.then(response => {
						if (response.ok) {
							return response.json();
						}
					})
					.then(data => {
						if (data) {
							getActions().saveVehicles(data);
						}
					})
					.catch(err => console.error(err));
			},
			saveVehicles: newResponse => {
				let oldResponse = getStore().vehicles;
				let oldResponseResults = getStore().vehicles ? getStore().vehicles.results : [];

				for (let indexVehicles in newResponse.results) {
					newResponse.results[indexVehicles].favorite = false;
				}
				newResponse.results = [...oldResponseResults, ...newResponse.results];
				setStore({ vehicles: newResponse });
			},
			toggleFavorite: (uid, path) => {
				let obj;

				function updateFavorite(obj) {
					let position = obj.results.findIndex(element => {
						if (element.uid === uid) {
							return true;
						}
					});

					obj.results[position].favorite = !obj.results[position].favorite;
					return obj;
				}

				switch (path) {
					case "people":
						obj = { ...getStore().people };
						let newPeople = updateFavorite(obj);
						setStore({ people: newPeople });
						break;
					case "planets":
						obj = { ...getStore().planets };
						let newPlanets = updateFavorite(obj);
						setStore({ planets: newPlanets });
						break;
					case "vehicles":
						obj = { ...getStore().vehicles };
						let newVehicles = updateFavorite(obj);
						setStore({ vehicles: newVehicles });
						break;
				}
			}
		}
	};
};

export default getState;
