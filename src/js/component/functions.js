export async function makeFetch(url) {
	const response = await fetch(url);

	if (response.ok) {
		const responseJson = await response.json();
		return responseJson;
	}
}
