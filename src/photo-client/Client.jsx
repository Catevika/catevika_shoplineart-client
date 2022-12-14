const pexelAuthorization = import.meta.env.VITE_PEXELS_API_KEY;

export const searchPhotos = async ({ query, page, per_page }) => {
	const data = await fetch(`https://api.pexels.com/v1//search?query=${query}&page=${page}&per_page=${per_page}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: pexelAuthorization
			}
		});
	return data.json();
}


