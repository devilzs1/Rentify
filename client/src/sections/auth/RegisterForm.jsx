import { useState } from "react";
import {
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Eye, EyeSlash } from "phosphor-react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import YupPassword from "yup-password";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { RegisterUser } from "../../redux/slices/auth";
import { useDispatch } from "react-redux";
YupPassword(Yup);

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required!"),
    lastName: Yup.string().required("Last name is required!"),
    email: Yup.string()
      .required("Email is required!")
      .email("It must be a valid email address!"),
    phone: Yup.string()
      .required("Phone number is required!")
      .matches(
        /^\+?[0-9]+$/,
        "Phone number can only contain digits and the '+' symbol"
      )
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must be at most 15 digits"),
    password: Yup.string()
      .required("Password is required!")
      .min(
        8,
        "Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
      )
      .minLowercase(1, "Password must contain at least 1 lower case letter")
      .minUppercase(1, "Password must contain at least 1 upper case letter")
      .minNumbers(1, "Password must contain at least 1 number")
      .minSymbols(1, "Password must contain at least 1 special character"),
    userType: Yup.string(),
  });

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    userType: "buyer",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
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
      if (isSeller) {
        data.userType = "seller";
      }
      dispatch(RegisterUser(data));
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

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <RHFTextField name="firstName" label="First Name" />
          <RHFTextField name="lastName" label="Last Name" />
        </Stack>

        <RHFTextField name="email" label="Email Address" />
        <RHFTextField name="phone" label="Phone Number" />
        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
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
        <FormControlLabel
          control={
            <Checkbox
              checked={isSeller}
              onChange={(e) => setIsSeller(e.target.checked)}
              name="userType"
              color="primary"
            />
          }
          label="Register as Seller"
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
          Create Account
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default RegisterForm;
