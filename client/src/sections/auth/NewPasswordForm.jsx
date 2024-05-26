import  { useState } from "react";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import {Link as RouterLink, useSearchParams} from "react-router-dom";
import { Eye, EyeSlash } from "phosphor-react";
import {
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {useDispatch} from "react-redux";
import YupPassword from "yup-password";
import { NewPassword } from "../../redux/slices/auth";
YupPassword(Yup);

const NewPasswordForm = () => {
  const dispatch = useDispatch();
  const [queryParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);

  const NewPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required!")
      .min(
        8,
        "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
      )
      .minLowercase(1, "password must contain at least 1 lower case letter")
      .minUppercase(1, "password must contain at least 1 upper case letter")
      .minNumbers(1, "password must contain at least 1 number")
      .minSymbols(1, "password must contain at least 1 special character"),

    passwordConfirm: Yup.string()
      .required("Password is required!")
      .oneOf([Yup.ref("password"), null], "Password must match!"),
  });

  const defaultValues = {
    password: "",
    passwordConfirm: "",
  };
  const methods = useForm({
    resolver: yupResolver(NewPasswordSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      //submit data to database
      dispatch(NewPassword({...data,token: queryParams.get("token")}));
    } catch (error) {
      reset();
      setError("afterSubmit", { ...error, message: error.message });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField
          name="password"
          label="New Password"
          type={showPassword ? "text" : "newPassword"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <RHFTextField
          name="passwordConfirm"
          label="Confirm Password"
          type={showPassword ? "text" : "passwordConfirm"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          sx={{
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
          Submit
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default NewPasswordForm;
