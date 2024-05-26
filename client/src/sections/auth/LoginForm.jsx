import  { useState } from 'react'
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { Eye, EyeSlash } from "phosphor-react";
import { Link, Stack, Alert, IconButton, InputAdornment, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup"
import {useForm} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import YupPassword from "yup-password"
import {  useDispatch } from '../../redux/store';
import { LoginUser } from '../../redux/slices/auth';
YupPassword(Yup)

const LoginForm = () => {
  const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        email: Yup.string().required("Email is required!").email("It must be a valid email address!"),
        password:Yup.string().required("Password is required!")
    });
    
    const defaultValues ={
        email: "",
        password: "",
    }
    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const {reset, setError, handleSubmit, formState:{errors}} = methods;

    const onSubmit = async (data) =>{
        try{
            //submit data to database
            dispatch(LoginUser(data));
        }catch(error){
            reset();
            setError("afterSubmit",{...error, message:error.message,})
        }
    }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField name="email" label="Email Address" />
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
      </Stack>
      <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <Link
          component={RouterLink}
          to="/auth/reset-password"
          variant="body2"
          color="inherit"
          underline="always"
        >
          Forgot password?
        </Link>
      </Stack>

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
        Login
      </Button>
    </FormProvider>
  );
}

export default LoginForm