
import { Link, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from "react-router-dom";
import { CaretLeft } from "phosphor-react";
import ResetPasswordForm from "../../sections/auth/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <>
      <Stack spacing={1} sx={{ mb: 5, position: "relative", mt:2 }}>
        <Typography variant="h3" paragraph>
          Forgot your Password?
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          Please enter the email address associated with your account and We
          will email you a link to reset your password.
        </Typography>
      </Stack>

        <ResetPasswordForm/>

      <Link
        component={RouterLink}
        to={"/auth/login"}
        color="inherit"
        variant="subtitle2"
        sx={{
          mt: 3,
          mx: "auto",
          alignItems: "center",
          display: "inline-flex",
        }}
      >
        <CaretLeft size={24} />
        Return to sign in
      </Link>
    </>
  );
}

export default ResetPassword