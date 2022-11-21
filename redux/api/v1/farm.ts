import { createApi } from "@reduxjs/toolkit/query/react";
import { FarmModelI } from "types";
import { baseQuery } from "./config";

export const farmApi = createApi({
  baseQuery: baseQuery,
  reducerPath: "farmApi",
  tagTypes: ["Farm"],
  endpoints: (builder) => ({
    createFarm: builder.mutation<void, FarmModelI>({
      query: (body) => ({
        url: "farm",
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body,
      }),
      invalidatesTags: ["Farm"],
    }),
    getAllFarms: builder.query<FarmModelI[], string>({
      query: () => ({ url: "farms" }),
      providesTags: ["Farm"],
    }),
    getFarmById: builder.query<FarmModelI, number>({
      query: (id) => ({ url: `farm/${id}` }),
    }),
  }),
});

export const {
  useCreateFarmMutation,
  useLazyGetAllFarmsQuery,
  useLazyGetFarmByIdQuery,
} = farmApi;
