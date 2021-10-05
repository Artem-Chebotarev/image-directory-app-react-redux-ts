import { createClient, ErrorResponse, Photos, PhotosWithTotalResults } from "pexels";
import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import { PhotosAction, PhotosActionEnum } from "../../types/photos";
import { RootState } from "../store/store";

const client = createClient(process.env.REACT_APP_PEXELS_API || '');

export const fetchPhotos = (page: number, searchQuery: string, onSuccess: () => void, onError: () => void): ThunkAction<void, RootState, null, PhotosAction> => {
    return async (dispatch: Dispatch<PhotosAction>) => {
        try {
            dispatch({ type: PhotosActionEnum.FETCH_PHOTOS });

            const photos: PhotosWithTotalResults | ErrorResponse = await client.photos.search({ page, query: searchQuery, per_page: 10 });

            if ('error' in photos) {
                throw new Error(photos.error);
            } else {
                dispatch({
                    type: PhotosActionEnum.FETCH_PHOTOS_SUCCESS,
                    payload: {
                        photos: photos.photos,
                        page: page,
                        totalResults: photos.total_results,
                    },
                });

                onSuccess();
            }
        } catch (error) {
            dispatch({
                type: PhotosActionEnum.FETCH_PHOTOS_ERROR,
                payload: 'Произошла ошибка при загрузке фотографий',
            });

            onError();
        }
    }
};

export const fetchCuratedPhotos = (page: number, onSuccess: () => void, onError: () => void): ThunkAction<void, RootState, null, PhotosAction> => {
    return async (dispatch: Dispatch<PhotosAction>) => {
        try {
            dispatch({ type: PhotosActionEnum.FETCH_PHOTOS });
            
            const photos: Photos | ErrorResponse = await client.photos.curated({ page, per_page: 10 });

            if ('error' in photos) {
                throw new Error(photos.error);
            } else {
                dispatch({
                    type: PhotosActionEnum.FETCH_PHOTOS_SUCCESS,
                    payload: {
                        photos: photos.photos,
                        page: page,
                        totalResults: 0,
                    },
                });

                onSuccess();
            }
        } catch (error) {
            dispatch({
                type: PhotosActionEnum.FETCH_PHOTOS_ERROR,
                payload: 'Произошла ошибка при загрузке фотографий',
            });

            onError();
        }
    }
}

export const fetchNewCategory = (page: number, onSuccess: () => void, onError: () => void): ThunkAction<void, RootState, null, PhotosAction> => {
    return async (dispatch: Dispatch<PhotosAction>) => {
        try {
            dispatch({ type: PhotosActionEnum.FETCH_NEW_CATEGORY });
            
            const photos: Photos | ErrorResponse = await client.photos.curated({ page, per_page: 10 });

            if ('error' in photos) {
                throw new Error(photos.error);
            } else {
                dispatch({
                    type: PhotosActionEnum.FETCH_PHOTOS_SUCCESS,
                    payload: {
                        photos: photos.photos,
                        page: page,
                        totalResults: 0,
                    },
                });

                onSuccess();
            }
        } catch (error) {
            dispatch({
                type: PhotosActionEnum.FETCH_PHOTOS_ERROR,
                payload: 'Произошла ошибка при загрузке фотографий',
            });

            onError();
        }
    }
}