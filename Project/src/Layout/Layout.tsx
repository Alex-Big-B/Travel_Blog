import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import "../art/styles/container.scss";


export const Layout = () => {
  return (
    <>
      <Header />
      <main className="container">

        
        <Outlet />
      </main>
    </>
  );
};
