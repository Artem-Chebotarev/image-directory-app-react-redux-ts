import { combineReducers } from 'redux';
import photosReducer from '../imagesReducer/photosReducer';

const rootReducer = combineReducers({
    photos: photosReducer,
});

export default rootReducer;