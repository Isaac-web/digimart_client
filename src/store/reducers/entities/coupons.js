import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../actions/api";

const slice = createSlice({
  name: "coupons",
  initialState: {
    loading: false,
    posting: false,
    errorMessage: "",
    data: {},
  },
  reducers: {
    couponsFetchBegan: (coupons) => {
      coupons.loading = true;
    },
    couponsFetched: (coupons, action) => {
      coupons.data.items = action.payload.data.coupons;
    },
    couponsFetchEnded: (coupons) => {
      coupons.loading = false;
    },
    couponDeleted: (coupons, action) => {
      coupons.data.items = coupons.data.items.filter(
        (item) => item._id !== action.payload._id
      );
    },
    couponAddBegan: (coupons) => {
      coupons.posting = true;
    },
    couponAdded: (coupons, action) => {
      console.log(action.payload.data);
      coupons.data.items.push(action.payload.data);
    },
    couponAddEnded: (coupons) => {
      coupons.posting = false;
    },
  },
});

export default slice.reducer;
const {
  couponsFetchBegan,
  couponsFetched,
  couponsFetchEnded,
  couponDeleted,
  couponAdded,
  couponAddBegan,
  couponAddEnded,
} = slice.actions;

const url = "/coupons";
export const fetchCoupons = () => async (dispatch) => {
  dispatch(
    apiRequest({
      url,
      onSuccess: couponsFetched.type,
      onBegin: couponsFetchBegan.type,
      onEnd: couponsFetchEnded.type,
      toggleOnError: true,
    })
  );
};

export const deleteCoupon = (coupon) => async (dispatch) => {
  dispatch(couponDeleted({ _id: coupon._id }));

  dispatch(
    apiRequest({
      url: `${url}/${coupon._id}`,
      method: "delete",
      toggleOnSuccess: true,
      toggleOnError: true,
    })
  );
};

export const createCoupon = (data, callback) => async (dispatch) => {
  await dispatch(
    apiRequest({
      method: "post",
      data,
      url,
      onSuccess: couponAdded.type,
      onBegin: couponAddBegan.type,
      onEnd: couponAddEnded.type,
      toggleOnError: true,
      toggleOnSuccess: true,
    })
  );

  if (typeof callback === "function") callback();
};
