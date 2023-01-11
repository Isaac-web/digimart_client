import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../actions/api";

const slice = createSlice({
  name: "dashboardSummery",
  initialState: {
    loading: false,
    data: {
      productsCount: 0,
      recipeCount: 0,
      customerCount: 0,
    },
  },
  reducers: {
    summeryFetchBegan: (summery) => {
      summery.loading = true;
    },
    summeryFetchEnded: (summery) => {
      summery.loading = false;
    },
    summeryFetched: (summery, action) => {
      summery.data.productsCount = action.payload.data.productsCount;
      summery.data.recipeCount = action.payload.data.recipeCount;
      summery.data.customerCount = action.payload.data.customerCount;
    },
  },
});

export default slice.reducer;
const { summeryFetchBegan, summeryFetchEnded, summeryFetched } = slice.actions;

const url = "/reports";
export const fetchSummery = () => (dispatch) => {
  dispatch(
    apiRequest({
      url: `${url}/summary`,
      toggleOnError: true,
      onBegin: summeryFetchBegan.type,
      onEnd: summeryFetchEnded.type,
      onSuccess: summeryFetched.type,
    })
  );
};
