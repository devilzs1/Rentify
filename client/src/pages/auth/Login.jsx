
import { Link as RouterLink } from "react-router-dom";
import { Link, Stack, Typography } from "@mui/material";
import LoginForm from "../../sections/auth/LoginForm";

const Login = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative", mt:1 }}>
        <Typography variant="h4">Login to Rentify</Typography>

        <LoginForm />


        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New User?</Typography>
          <Link to="/auth/register" component={RouterLink} variant="subtitle2">
            Create an account!
          </Link>
        </Stack>
      </Stack>
    </>
  );
};

export default Login;
