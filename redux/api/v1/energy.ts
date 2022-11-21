import { createApi } from "@reduxjs/toolkit/query/react";
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
  }),
});

export const { useLazyGetTotalEnergyQuery } = energyApi;
