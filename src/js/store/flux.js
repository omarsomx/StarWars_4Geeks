const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			characters: null,
			planets: null,
			vehicles: null,
			favorites: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			loadCharacters: url => {
				fetch(url)
					.then(response => {
						console.log(response);
						if (response.ok) {
							return response.json();
						}
					})
					.then(data => {
						console.log(data);
						if (data) {
							getActions().saveCharacters(data);
						}
					})
					.catch(err => console.error(err));
			},
			saveCharacters: dataCharacters => {
				let newCharacters = getStore().characters;

				newCharacters
					? (newCharacters.results = [...newCharacters.results, ...dataCharacters.results])
					: (newCharacters = dataCharacters);

				setStore({ characters: newCharacters });
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
			savePlanets: dataPlanets => {
				let newPlanets = getStore().planets;

				newPlanets
					? (newPlanets.results = [...newPlanets.results, ...dataPlanets.results])
					: (newPlanets = dataPlanets);

				setStore({ planets: newPlanets });
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
			saveVehicles: dataVehicles => {
				let newVehicles = getStore().vehicles;

				newVehicles
					? (newVehicles.results = [...newVehicles.results, ...dataVehicles.results])
					: (newVehicles = dataVehicles);

				setStore({ vehicles: newVehicles });
			},
			addFavorite: (uid, name) => {
				let favorite = {
					uid: uid,
					name: name
				};
				let oldFavorites = getStore().favorites;
				let isFavoriteAdded = oldFavorites.find(f => f.uid == favorite.uid && f.name == favorite.name);

				if (isFavoriteAdded) {
					getActions().deleteFavorite(favorite.uid, favorite.name);
				} else {
					let newFavorites = [...oldFavorites, favorite];
					setStore({ favorites: newFavorites });
				}
			},
			deleteFavorite: (uid, name) => {
				let newFavorites = getStore().favorites;
				let positionFavoriteDelete = newFavorites.findIndex(favorite => {
					if (favorite.uid === uid && favorite.name === name) {
						return true;
					}
				});
				newFavorites.splice(positionFavoriteDelete, 1);
				setStore(newFavorites);
			},
			isFavorite: (uid, name) => {
				let newFavorites = getStore().favorites;
				let isFavoriteAdded = newFavorites.find(f => f.uid == uid && f.name == name);
				if (isFavoriteAdded) {
					return true;
				}
			}
		}
	};
};

export default getState;
