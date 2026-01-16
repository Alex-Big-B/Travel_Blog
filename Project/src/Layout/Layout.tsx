import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import "../art/styles/container.scss";
import ErrorModal from "../components/modalWindows/ErrorModal/ErrorModal";
import { useAppSelector } from "../redux/hooksType";
import { Suspense } from "react";
import { Loader } from "../components/Loader/Loader";
import { AgreedModal } from "../components/modalWindows/AgreedModal/AgreedModal";

export const Layout = () => {
  const isError = useAppSelector((state) => state.error.isError);
  const isAgreed = useAppSelector((state) => state.agreed.agreed);

  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>

      <Suspense fallback={<Loader />}>
        {isError && <ErrorModal />}
        {isAgreed && <AgreedModal />}
      </Suspense>
    </>
  );
};
