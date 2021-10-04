import React, { FC, useEffect, useState } from 'react';
import { useActions } from './hooks/useActions';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useTypedSelector } from './hooks/useTypedSelector';
import Home from './Pages/Home';
import { Photo } from 'pexels';
import Modal from './components/Modal.tsx/Modal';

const App: FC = () => {
  const { fetchPhotos, fetchCuratedPhotos } = useActions();
  const { photos, totalResult, isLoading, error } = useTypedSelector(state => state.photos);
  const [mode, setMode] = useState<string>('trending');
  const [searchFor, setSearchFor] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [title, setTitle] = useState<string>('Trending');
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [src, setSrc] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('');
  const [authorUrl, setAuthorUrl] = useState<string>('');

  useEffect(() => {
    fetchCuratedPhotos(1, () => setBtnLoading(false), () => setBtnLoading(false));
  }, []);

  const searchPhotosHandler = (query: string) => {
    setMode('search');
    setSearchFor(query);
    setPage(1);
    fetchPhotos(1, query, () => setBtnLoading(false), () => setBtnLoading(true));
    setTitle(`Search result for "${query}"`);
  };

  const loadMoreHandler = () => {
    setBtnLoading(true);
    setPage(prev => prev + 1);

    if (mode === 'trending') {
      fetchCuratedPhotos(page + 1, () => setBtnLoading(false), () => setBtnLoading(true));
    } else {
      fetchPhotos(page + 1, searchFor, () => setBtnLoading(false), () => setBtnLoading(true));
    }

  }

  const showTrendingPhotos = () => {
    setTitle('Trending');
    setMode('trending');
    fetchCuratedPhotos(page + 1, () => setBtnLoading(false), () => setBtnLoading(true));
  }

  const modalCloseHandler = () => {
    setSrc('');
    setAuthorName('');
    setAuthorUrl('');
    setShowModal(false);
  }

  const imageClickHandler = (event: React.MouseEvent<HTMLImageElement>, photo: Photo) => {
    event.preventDefault();
    setSrc(photo.src.original);
    setAuthorUrl(photo.photographer_url);
    setAuthorName(photo.photographer);
    setShowModal(true);
  }

  return (
    <div>
      <Home onSearch={searchPhotosHandler} />
      <div className="container px-4">
        {isLoading && <div className="is-flex is-justify-content-center py-6"><div className="loading"></div></div>}

        {error
          ?
          <div className='notification is-danger mt-6 has-text-centered'>{error}</div>
          :
          <>
            {mode === 'search' && <div className="is-flex is-justify-content-center pt-5">
              <button className="button is-link" onClick={showTrendingPhotos}>Back to trending</button>
            </div>}
            <h2 className="is-size-1 has-text-centered py-6">{title}</h2>
            {
              photos.length
                ?
                <ResponsiveMasonry columnsCountBreakPoints={{ 480: 2, 900: 5 }}>
                  <Masonry gutter={'20'}>
                    {
                      photos.map(elem => (
                        <div key={elem.id} className="masonry-item">
                          <a href="/#" onClick={(event) => { }}>
                            <img src={elem.src.large} alt="" onClick={(event: React.MouseEvent<HTMLImageElement>) => imageClickHandler(event, elem)} />
                          </a>
                        </div>
                      ))
                    }
                  </Masonry>
                </ResponsiveMasonry>
                :
                <p className="has-text-centered">No results</p>
            }

            <div className="is-flex is-justify-content-center py-6">
              {((totalResult > page * 10) || mode === 'trending')
                && <button className="button is-primary is-large" onClick={loadMoreHandler} disabled={btnLoading}>
                  {!btnLoading ? 'Load more' : <div className="loading loading--small"></div>}
                </button>}
            </div>
          </>
        }
      </div>
      {showModal && <Modal src={src} onClose={modalCloseHandler} authorName={authorName} authorUrl={authorUrl} />}
    </div>
  );
}

export default App;
