import * as actionTypes from "../constants/categoryConstants";

import axios from "axios";

export const getCategories = () => async (dispatch) => {
    const { data } = await axios.get("/api/categories");
    dispatch({
        type: actionTypes.GET_CATEGORIES_REQUEST,
        payload: data,

    })
}

export const saveAttributeToCatDoc = (key, val, categoryChosen) => async (dispatch, getState) => {
    const { data } = await axios.post("/api/categories/attr", { key, val, categoryChosen });
    if (data.categoryUpdated) {
        dispatch({
            type: actionTypes.SAVE_ATTR,
            payload: [...data.categoryUpdated],
        })
    }
}

export const newCategory = (category) => async (dispatch, getState) => {
    const cat = getState().getCategories.categories;
    const { data } = await axios.post("/api/categories", { category });
    if (data.categoryCreated) {
        dispatch({
            type: actionTypes.INSERT_CATEGORY,
            payload: [...cat, data.categoryCreated]
        })
    }
}

export const deleteCategory = (category) => async (dispatch, getState) => {
    // get all of the categories from the redux state
    const cat = getState().getCategories.categories;
    const categories = cat.filter((item) => item.name !== category);
    // Also make an API request to delete from the database
    const {data} = await axios.delete("/api/categories/" + encodeURIComponent(category));
    if (data.categoryDeleted){
        dispatch({
            type: actionTypes.DELETE_CATEGORY,
            payload: [...categories],
        })
    }
}