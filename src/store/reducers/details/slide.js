import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../actions/api";

const slice = createSlice({
  name: "slide",
  initialState: {
    loading: false,
    data: {},
  },
  reducers: {
    slideFetchBegan: (slide, action) => {
      slide.loading = true;
    },
    slideFetchEnded: (slide, action) => {
      slide.loading = false;
    },
    slideFetched: (slide, action) => {
      slide.data = action.payload.data;
    },
    slideCleared: (slide) => {
      slide.loading = false;
      slide.data = {};
    },
  },
});

export default slice.reducer;
const { slideFetchBegan, slideFetchEnded, slideFetched, slideCleared } =
  slice.actions;

const url = "/sliders";
export const fetchSlide = (id) => async (dispatch) => {
  dispatch(
    apiRequest({
      url: `${url}/${id}`,
      onBegin: slideFetchBegan.type,
      onEnd: slideFetchEnded.type,
      onSuccess: slideFetched.type,
      toggleOnError: true,
    })
  );
};

export const clearCurrentSlide = () => async (dispatch) => {
  dispatch(slideCleared());
};
