import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { AppDispatch } from "../redux/store/store";
import { fetchPhotos, fetchCuratedPhotos } from "../redux/actionCreators/photosAC";

export const useActions = () => {
    const dispatch = useDispatch<AppDispatch>();

    return bindActionCreators({
        fetchPhotos,
        fetchCuratedPhotos,
    }, dispatch);
};