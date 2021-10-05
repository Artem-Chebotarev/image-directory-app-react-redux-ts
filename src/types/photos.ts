import { Photo } from 'pexels';

export interface PhotosState {
    photos: Photo[];
    totalResult: number;
    isLoading: boolean;
    error: string | null;
}

export enum PhotosActionEnum {
    FETCH_PHOTOS = 'FETCH_PHOTOS',
    FETCH_PHOTOS_SUCCESS = 'FETCH_PHOTOS_SUCCESS',
    FETCH_PHOTOS_ERROR = 'FETCH_PHOTOS_ERROR',
    FETCH_NEW_CATEGORY= 'FETCH_NEW_CATEGORY',
}

export interface FetchPhotosAction {
    type: PhotosActionEnum.FETCH_PHOTOS;
}

export interface FetchPhotosSuccessAction {
    type: PhotosActionEnum.FETCH_PHOTOS_SUCCESS;
    payload: {
        photos: Photo[];
        page: number;
        totalResults: number;
    }
}

export interface FetchPhotosErrorAction {
    type: PhotosActionEnum.FETCH_PHOTOS_ERROR;
    payload: string;
}

export interface FetchPhotosNewCategoryAction {
    type: PhotosActionEnum.FETCH_NEW_CATEGORY;
}

export type PhotosAction =
    FetchPhotosAction |
    FetchPhotosSuccessAction |
    FetchPhotosErrorAction |
    FetchPhotosNewCategoryAction;