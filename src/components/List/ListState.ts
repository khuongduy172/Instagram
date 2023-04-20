import { useContext } from 'react';
import { PostContext } from '../../helper/ImageLibrary';

const ListState = () => {
  const { state, dispatch }: any = useContext(PostContext);

  const selectedImagesFromAlbum = (photoUri: any) => {
    if (state.selectedImagesFromAlbum.includes(photoUri)) {
      dispatch({ type: 'REMOVE_IMAGE', payload: photoUri });
    } else if (!state.multiple) {
      dispatch({
        type: 'ADD_IMAGE',
        payload: {
          photoUri,
          multiple: state.multiple,
        },
      });
    } else {
      dispatch({
        type: 'ADD_IMAGE',
        payload: { photoUri, multiple: state.multiple },
      });
    }
  };
  return [state, dispatch, selectedImagesFromAlbum];
};

export default ListState;
