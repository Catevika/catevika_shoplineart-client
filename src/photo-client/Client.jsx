import { createClient } from 'pexels';

const pexelAuthorization = import.meta.env.VITE_PEXELS_API_KEY;
const client = createClient(pexelAuthorization);

export const searchPhotos = async ({ query, per_page }) =>
	client.photos.search({ query, per_page });
