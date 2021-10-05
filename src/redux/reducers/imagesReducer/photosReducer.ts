import { Photo } from "pexels";
import { PhotosAction, PhotosActionEnum, PhotosState } from "../../../types/photos";

const initStatePhotos: PhotosState = {
    photos: [],
    totalResult: 0,
    isLoading: false,
    error: '',
}

const photosReducer = (state = initStatePhotos, action: PhotosAction): PhotosState => {
    switch (action.type) {
        case PhotosActionEnum.FETCH_PHOTOS:
            return {
                ...state,
                isLoading: true,
                error: null,
                // photos: [],
                totalResult: 0,
            }

        case PhotosActionEnum.FETCH_PHOTOS_SUCCESS:
            const { page, photos } = action.payload;

            let photosArr: Photo[] = [];

            // чтобы сделать подгрузку фото, нужно знать номер страницы,
            // когда номер > 1, фото добавляются в массив с фото, а не перезатирают его заного
            if (page > 1) {
                photosArr = [...state.photos, ...photos];
            } else {
                photosArr = photos;
            }

            return {
                ...state,
                isLoading: false,
                error: null,
                photos: photosArr,
                totalResult: action.payload.totalResults,
            }

        case PhotosActionEnum.FETCH_PHOTOS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                photos: [],
                totalResult: 0,
            }

        case PhotosActionEnum.FETCH_NEW_CATEGORY:
            return {
                ...state,
                isLoading: true,
                error: null,
                photos: [],
                totalResult: 0,
            }

        default:
            return state;
    }

}

export default photosReducer;