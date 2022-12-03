import { createApi } from "@reduxjs/toolkit/query/react";
import { FarmModelI } from "types";
import { ProducedFarmEnergy } from "types/producedFarmEnergy";
import { baseQuery } from "./config";

export const energyApi = createApi({
  baseQuery: baseQuery,
  reducerPath: "energyApi",
  endpoints: (builder) => ({
    getTotalEnergy: builder.query<void, any>({
      query: () => ({
        url: "totalEnergy",
      }),
    }),
    createProducedFarmEnergy: builder.mutation<void, FarmModelI>({
      query: (body) => ({
        url: `farmEnergy/${body.id}`,
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body,
      }),
    }),
    getProducedFarmEnergyById: builder.query<ProducedFarmEnergy, string>({
      query: (id) => ({ url: `farmEnergy/${id}` }),
    }),
  }),
});

export const {
  useLazyGetTotalEnergyQuery,
  useCreateProducedFarmEnergyMutation,
  useLazyGetProducedFarmEnergyByIdQuery,
} = energyApi;
