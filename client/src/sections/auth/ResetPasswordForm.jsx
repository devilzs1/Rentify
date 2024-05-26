
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Button } from '@mui/material';
import { yupResolver } from "@hookform/resolvers/yup";
import YupPassword from "yup-password";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import {useDispatch} from "react-redux";
import { ForgotPassword } from '../../redux/slices/auth';
YupPassword(Yup);

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
    const ResetPasswordSchema = Yup.object().shape({
      email: Yup.string()
        .required("Email is required!")
        .email("Email must be a valid email address!"),
    });

    const methods = useForm({
      resolver: yupResolver(ResetPasswordSchema),
      defaultValues: { email: "" },
    });

    const { handleSubmit } = methods;

    const onSubmit = async (data) => {
      try {
        //   Send API Request
        dispatch(ForgotPassword(data));
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField name="email" label="Email address" />

      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        sx={{
          mt: 3,
          bgcolor: "text.primary",
          color: (theme) =>
            theme.palette.mode === "light" ? "common.white" : "grey.800",
          "&:hover": {
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
          },
        }}
      >
        Send Request
      </Button>
    </FormProvider>
  );
}

export default ResetPasswordForm