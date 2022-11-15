import axios from "axios";

import { apiRequest, apiRequestError, apiRequestSuccess } from "../actions/api";

const apiMiddleware =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiRequest.type) return next(action);

    const {
      data,
      method,
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
      baseURL: "http://localhost:9000/api",
    });

    try {
      if (onBegin) dispatch({ type: onBegin });
      const response = await api.request({
        url,
        method,
        data,
      });

      if (onSuccess) {
        dispatch({
          type: onSuccess,
          payload: {
            data: response.data,
          },
        });
      }

      dispatch({
        type: apiRequestSuccess.type,
        payload: {
          data: response.data,
        },
      });
    } catch (err) {
      if (onError) {
        if (err.response) {
          dispatch({
            type: onError,
            payload: {
              errorMessage: err.response.data.message,
            },
          });

          if (toggleOnError) {
            dispatch({
              type: toggleOnError,
              payload: {
                message: err.response.data.message,
                severity: "error",
              },
            });
          }
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
