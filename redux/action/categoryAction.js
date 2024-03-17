import { ADD_TO_CATEGORY } from "../constants/actionTypes";

export const addToCategory = (data) => ({
  type: ADD_TO_CATEGORY,
  payload: data,
});