import { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { searchPhotos } from '../../photo-client/Client';
import { FiMaximize } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { GrCaretPrevious, GrCaretNext } from 'react-icons/gr';
import './gallery.css';

export default function Gallery({ term }) {
	const [searching, setSearching] = useState(false);
	const [error, setError] = useState(false);
	const [pageNumber, setPageNumber] = useState(1);
	const [gallery, setGallery] = useState([]);
	const [nbPages, setNbPages] = useState(null);

	const [isShowing, setIsShowing] = useState(false);

	const toggle = () => setIsShowing(!isShowing);

	useEffect(() => {
		const getPhotos = async () => {
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
					{gallery.map((photo) => {
						return (
							<li key={photo.id} className='gallery__photo'>
								<LazyLoadImage
									src={isShowing ? photo.src.large : photo.src.medium}
									alt={photo.alt}
									loading='lazy'
									className='gallery__photo-img'
								/>
								<div className='gallery__photo-overlay'>
									<p className='gallery__photo-text'>
										<a
											href={photo.photographer_url}
											className='gallery__photo-link'
										>
											{photo.photographer}
										</a>
										{isShowing ? (
											<MdClose
												title='View medium size'
												className='gallery__photo-icon'
												onClick={toggle}
											/>
										) : (
											<FiMaximize
												title='View large size'
												className='gallery__photo-icon'
												onClick={toggle}
											/>
										)}
									</p>
								</div>
							</li>
						);
					})}
				</ul>
			)}
		</article>
	);
}
