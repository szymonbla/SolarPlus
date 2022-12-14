import { createApi } from "@reduxjs/toolkit/query/react";

import { ProducedFarmEnergy } from "types/producedFarmEnergy";
import { FarmModelI, RecursivePartial, SummarizedFarmsResults } from "types";
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
    getProducedEnergyByFarmId: builder.query<ProducedFarmEnergy, number>({
      query: (id) => ({ url: `farmEnergy/${id}` }),
    }),
    updateFarmById: builder.mutation<string, RecursivePartial<FarmModelI>>({
      query: (body) => ({
        url: `farm/${body.id}`,
        headers: {
          "content-type": "application/json",
        },
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Farm"],
    }),
    getSummarizedFarmsResults: builder.query<SummarizedFarmsResults, unknown>({
      query: () => ({ url: "summarizedFarmsResults" }),
      providesTags: ["Farm"],
    }),
  }),
});

export const {
  useCreateFarmMutation,
  useLazyGetAllFarmsQuery,
  useLazyGetFarmByIdQuery,
  useUpdateFarmByIdMutation,
  useLazyGetProducedEnergyByFarmIdQuery,
  useLazyGetSummarizedFarmsResultsQuery,
} = farmApi;
