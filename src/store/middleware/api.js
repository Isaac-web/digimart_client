import axios from "axios";
import storage from "../../utils/storage";

import { apiRequest, apiRequestError, apiRequestSuccess } from "../actions/api";
import { showSnackbar } from "../reducers/utils/snackbar";

const apiMiddleware =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiRequest.type) return next(action);

    const {
      data,
      method,
      params,
      url,
      onSuccess,
      onError,
      onBegin,
      onEnd,
      toggleOnError,
      toggleOnSuccess,
    } = action.payload;

    next(action);

    const api = axios.create({
      baseURL: process.env.REACT_APP_API_URI,
    });

    api.interceptors.request.use((req) => {
      req.headers["x-auth-token"] = storage.getItem("token");
      return req;
    });
    try {
      if (onBegin) dispatch({ type: onBegin });
      const response = await api.request({
        url,
        method,
        data,
        params,
      });

      if (onSuccess) {
        dispatch({
          type: onSuccess,
          payload: {
            data: response.data,
          },
        });
      }

      if (toggleOnSuccess) {
        dispatch(
          showSnackbar({
            message: "Success...",
            severity: "success",
          })
        );
      }

      dispatch({
        type: apiRequestSuccess.type,
        payload: {
          data: response.data,
        },
      });
    } catch (err) {
      console.log(err);
      if (onError) {
        if (err?.response) {
          dispatch({
            type: onError,
            payload: {
              errorMessage: err.response.data.message,
            },
          });
        } else {
          dispatch({
            type: onError,
            payload: {
              errorMessage: err.message,
            },
          });
        }
      }

      if (err.response) {
        if (toggleOnError) {
          dispatch(
            showSnackbar({
              message: err.response.data,
              severity: "error",
            })
          );
          // dispatch({
          //   type: toggleOnError,
          //   payload: {
          //     message: err.response.data.message,
          //     severity: "error",
          //   },
          // });
        }

        dispatch({
          type: apiRequestError.type,
          payload: {
            errorMessage: err.response.data.message,
          },
        });
      } else {
        dispatch({
          type: apiRequestError.type,
          payload: {
            errorMessage: err.message,
          },
        });
      }
    } finally {
      if (onEnd) dispatch({ type: onEnd });
    }
  };

export default apiMiddleware;
