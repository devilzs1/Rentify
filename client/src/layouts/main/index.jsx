import { Container} from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer";

const MainLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <>
      <Container >
        <Outlet />
        </Container>
      <Footer/>
    </>
  )
};

export default MainLayout;
