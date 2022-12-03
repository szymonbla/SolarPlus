export interface FarmEnergyResponse {
  inputs: InputsType;
  outputs: OutputsType;
}

interface InputsType {
  economic_data: {
    interest: unknown;
    lifetime: unknown;
    system_cost: unknown;
  };
  location: {
    elevation: number;
    latitude: number;
    longitude: number;
  };
  meteo_data: {
    horizon_db: string;
    meteo_db: string;
    radiation_db: string;
    use_horizon: boolean;
    year_max: number;
    year_min: number;
  };
  mounting_system: {
    fixed: {
      azimuth: { optimal: boolean; value: number };
      slope: { optimal: boolean; value: number };
      type: string;
    };
  };
  pv_module: {
    peak_power: number;
    system_loss: number;
    technology: string;
  };
}

interface OutputsType {
  monthly: {
    fixed: MonthlyData[];
  };
  totals: {
    fixed: {
      E_d: number; // Average daily PV production for fixed mounting system
      E_m: number; // Average monthly PV production for fixed mounting system
      E_y: number; // Average daily PV production for fixed mounting system
      "H(i)_d": number; // Daily global irradiation on the plane-of-array
      "H(i)_m": number; // Monthly global irradiation on the plane-of-array
      "H(i)_y": number; // Average daily PV production for fixed mounting system
      SD_m: number; // Standard deviation of the monthly energy production due to year-to-year variation
      SD_y: number; // Standard deviation of the annual energy production due to year-to-year variation
      l_aoi: number; // Angle of incidence loss
      l_spec: string; // Spectral loss
      l_tg: number; // Temperature and irradiance loss
      l_total: number; // Total loss
    };
  };
}

interface MonthlyData {
  month: number;
  E_d: number;
  E_m: number;
  "H(i)_d": number;
  "H(i)_m": number;
  SD_m: number;
}

export interface EnergyData {
  pVEnergyProductionKWH: number;
  inPlaneIrradiationKWM2: number;
  variabilityKWH: number;
}
export interface MonthlyEnergyData {
  pVEnergyProductionKWH: number;
  inPlaneIrradiationKWM2: number;
  variabilityKWH: number;
}

export interface ProducedFarmEnergy {
  id?: string;
  yearly?: EnergyData;
  monthly?: MonthlyEnergyData[];
}
