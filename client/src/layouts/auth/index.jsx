import { Container, Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }
  return (
    <>
      <Container sx={{ mt: 5 }} maxWidth="sm">
        <Stack spacing={5}>
          <Stack sx={{ width: "100%" }} alignItems={"center"}>
            <img
              style={{ height: 100, width: 100, borderRadius: 15 }}
              src={logo}
              alt="logo"
            />
          </Stack>
        </Stack>

        <Outlet />
      </Container>
    </>
  );
};

export default AuthLayout;
