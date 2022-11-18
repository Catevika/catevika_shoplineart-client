import { useState, useEffect } from 'react';
import { FiMaximize } from 'react-icons/fi';
import { searchPhotos } from '../../photo-client/Client';

import './gallery.css';

export default function Gallery({ term }) {
	const [searching, setSearching] = useState(false);
	const [error, setError] = useState(false);
	const [gallery, setGallery] = useState([]);

	useEffect(() => {
		const getPhotos = async () => {
			setSearching(true);
			setError(false);
			const data = await searchPhotos({ query: term, per_page: 15 });
			setGallery(data.photos);
			setSearching(false);
		};
		if (term) getPhotos();
	}, [term]);

	console.log(gallery.length);

	return (
		<article className='gallery__container'>
			{!searching && !error && gallery?.length > 0 && (
				<ul className='gallery-wrapper'>
					{gallery.map((photo, index) => {
						return (
							<li key={index} className='gallery__photo'>
								<img
									src={photo.src.medium}
									alt={photo.url}
									className='gallery__photo-img'
								/>
								<div className='gallery__photo-overlay'>
									<p className='gallery__photo-text'>
										<a
											href={photo.photographer_url}
											className='gallery__photo-link'
										>
											Photo by {photo.photographer}
										</a>
										<FiMaximize className='gallery__photo-icon' />
									</p>
								</div>
							</li>
						);
					})}
				</ul>
			)}
			{!searching && !error && gallery?.length > 0 && (
				<button type='button'>Next page</button>
			)}
		</article>
	);
}
