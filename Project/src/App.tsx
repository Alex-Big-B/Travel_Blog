import { QueryClientProvider } from "@tanstack/react-query";
import "./art/styles/container.scss";
import { queryClient } from "./api/queryClient";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import sprite from "./art/sprite.svg"
import { Layout } from "./Layout/Layout";

function App() {
  return (
    <>
    <div style={{display: "none"}}>
      <img src={sprite} alt="" />
    </div>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Layout/>}>
            
            
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
