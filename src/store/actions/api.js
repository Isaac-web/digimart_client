import { createAction } from "@reduxjs/toolkit";

export const apiRequest = createAction("api/request");
export const apiRequestSuccess = createAction("api/success");
export const apiRequestError = createAction("api/failure");
