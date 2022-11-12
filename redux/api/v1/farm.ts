import { createApi } from "@reduxjs/toolkit/query/react";
import { FarmModelI } from "types";
import { baseQuery } from "./config";

export const farmApi = createApi({
  baseQuery,
  reducerPath: "farmApi",
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
    }),
    getAllFarms: builder.query<FarmModelI[], string>({
      query: () => ({ url: "farm" }),
    }),
  }),
});

export const { useCreateFarmMutation, useGetAllFarmsQuery } = farmApi;
