import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../actions/api";

const slice = createSlice({
  name: "designations",
  initialState: {
    loading: true,
    data: [],
  },
  reducers: {
    designationsFetchBegan: (designations) => {
      designations.loading = true;
    },
    designationsFetchEnded: (designations) => {
      designations.loading = false;
    },
    designationsFetched: (designations, action) => {
      designations.data = action.payload.data;
    },
  },
});

export default slice.reducer;
const { designationsFetchBegan, designationsFetchEnded, designationsFetched } =
  slice.actions;

const url = "/designations";
export const fetchDesignations = () => (dispatch) => {
  dispatch(
    apiRequest({
      onBegin: designationsFetchBegan.type,
      onEnd: designationsFetchEnded.type,
      onSuccess: designationsFetched.type,
      url,
    })
  );
};
