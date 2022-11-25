import { useState, useEffect } from 'react';
import { searchPhotos } from '../../photo-client/Client';
import Photo from '../../components/photo/Photo';
import { GrCaretPrevious, GrCaretNext } from 'react-icons/gr';
import './gallery.css';

export default function Gallery({ term })
{
	const [searching, setSearching] = useState(false);
	const [error, setError] = useState(false);
	const [nbPages, setNbPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [gallery, setGallery] = useState([]);

	useEffect(() =>
	{
		const getPhotos = async () =>
		{
			try {
				setSearching(true);
				setError(false);
				const data = await searchPhotos({
					query: term,
					page: pageNumber,
					per_page: 15
				});
				setNbPages(Math.ceil(data.total_results / data.per_page));
				setGallery(data.photos);
				setSearching(false);
			} catch (err) {
				setError({ error: err.message });
				console.log(error);
			}
		};
		if (term) getPhotos();
	}, [term, pageNumber]);

	return (
		<article className='gallery__container'>
			{!searching && !error && gallery?.length > 0 && (
				<div className='gallery__page'>
					<div className='gallery__buttons'>
						<button
							type='button'
							className='gallery__button'
							onClick={() => setPageNumber((pageNumber) => pageNumber - 1)}
							disabled={pageNumber === 1}
						>
							<GrCaretPrevious className='gallery__icon' />
						</button>
						<button
							type='button'
							className='gallery__button'
							onClick={() => setPageNumber((pageNumber) => pageNumber + 1)}
							disabled={pageNumber === nbPages}
						>
							<GrCaretNext className='gallery__icon' />{' '}
						</button>
					</div>
					<p className='gallery__page-text'>
						{' '}
						page: <span>{pageNumber}</span> / {nbPages}
					</p>
				</div>
			)}

			{!searching && !error && gallery?.length > 0 && (
				<ul className='gallery-wrapper'>
					{gallery?.map((photo) =>
					{
						return (
							<li key={photo.id} className='gallery__photo'>
								<Photo photo={photo} />
							</li>
						);
					})}
				</ul>
			)}
		</article>
	);
}
