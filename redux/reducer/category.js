import { ADD_TO_CATEGORY } from '../constants/actionTypes';

const initialState = {
  category: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CATEGORY:
      // Checking if each item in action.payload already exists in state.category
      const newData = action.payload.filter(item => !state.category.some(existingItem => existingItem.id === item.id));

      // If newData is not empty, push it to the category array
      if (newData.length > 0) {
        return {
          ...state,
          category: [...state.category, ...newData],
        };
      } else {
        // If empty, just return state like that
        return state;
      }
    default:
      return state;
  }
};

export default categoryReducer;