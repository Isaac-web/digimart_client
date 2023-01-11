import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../actions/api";

const slice = createSlice({
  name: "sliders",
  initialState: {
    loading: false,
    posting: false,
    data: {
      items: [],
      count: 0,
    },
  },
  reducers: {
    slidersFetchBegan: (sliders) => {
      sliders.loading = true;
    },
    slidersFetchEnded: (sliders) => {
      sliders.loading = false;
    },
    slidersFetched: (sliders, action) => {
      sliders.data.items = action.payload.data.sliders;
      sliders.data.count = action.payload.data.count;
    },
    sliderAddBegan: (sliders) => {
      sliders.posting = true;
    },
    sliderAddEnded: (sliders) => {
      sliders.data.posting = false;
    },
    sliderAdded: (sliders, action) => {
      sliders.data.items.push(action.payload.data);
      sliders.data.count = sliders.data.count + 1;
    },
    sliderDeleted: (sliders, action) => {
      sliders.data.items = sliders.data.items.filter(
        (item) => item._id !== action.payload.id
      );
    },
  },
});

export default slice.reducer;
const {
  sliderAddBegan,
  sliderAdded,
  sliderAddEnded,
  slidersFetchBegan,
  slidersFetchEnded,
  slidersFetched,
  sliderDeleted,
} = slice.actions;

const url = "/sliders";
export const addSlider = (data, callback) => async (dispatch) => {
  dispatch(
    apiRequest({
      url,
      data,
      method: "post",
      onSuccess: sliderAdded.type,
      onBegin: sliderAddBegan.type,
      onEnd: sliderAddEnded.type,
      toggleOnError: true,
      toggleOnSuccess: true,
    })
  );

  if (typeof callback === "function") callback();
};

export const fetchSliders = () => (dispatch) => {
  dispatch(
    apiRequest({
      url,
      onBegin: slidersFetchBegan.type,
      onEnd: slidersFetchEnded.type,
      onSuccess: slidersFetched.type,
    })
  );
};

export const deleteSlider = (slider, callback) => (dispatch) => {
  dispatch(sliderDeleted({ id: slider._id }));

  dispatch(
    apiRequest({
      url: `${url}/${slider._id}`,
      method: "delete",
      onSuccess: sliderDeleted.type,
      toggleOnError: true,
      toggleOnSuccess: true,
    })
  );

  if (typeof callback === "function") callback();
};
