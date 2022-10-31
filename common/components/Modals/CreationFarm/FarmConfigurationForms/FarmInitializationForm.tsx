import { Grid, Typography } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import {
  FarmConfigurationData,
  farmConfigurationSchema,
} from "common/components/Modals/types";
import { FormInputField } from "common/components/Form";

interface FarmInitializationFormProps {
  handleSubmit: SubmitHandler<FarmConfigurationData>;
  formId: string;
}

export const FarmInitializationForm = ({
  formId,
  handleSubmit,
}: FarmInitializationFormProps) => {
  const formMethods = useForm<FarmConfigurationData>({
    mode: "onChange",
    resolver: zodResolver(farmConfigurationSchema),
    defaultValues: {
      farmName: "",
    },
    reValidateMode: "onChange",
  });

  return (
    <Grid sx={{ width: "100%" }}>
      <FormProvider {...formMethods}>
        <form id={formId} onSubmit={formMethods.handleSubmit(handleSubmit)}>
          <Grid display="flex" flexDirection="column" gap={4}>
            <FormInputField
              label="Farm name"
              name="farmName"
              type="text"
              sx={{ width: "100%" }}
            />
            <Typography variant="h5" fontWeight="00" color="common.black">
              Localization
            </Typography>
            <Grid display="flex" gap={2}>
              <FormInputField label="Latitude" name="latitude" type="text" />
              <FormInputField label="Longitude" name="longitude" type="text" />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Grid>
  );
};
