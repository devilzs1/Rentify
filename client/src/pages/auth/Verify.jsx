import { Stack, Typography } from "@mui/material";
import VerifyForm from "../../sections/auth/VerifyForm";
import { useLocation } from "react-router-dom";

export default function LoginPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Please Verify OTP</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">Sent to email ({email})</Typography>
        </Stack>
      </Stack>

      <VerifyForm />
    </>
  );
}
