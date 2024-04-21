import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainMenu from "./views/MainMenu";
import GiftCards from "./views/GiftCards";
import SendMoney from "./views/SendMoney";
import Bills from "./views/Bills";
import BuyGoods from "./views/BuyGoods";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/gifts" element={<GiftCards />} />
          <Route path="/send-money" element={<SendMoney />} />
          <Route path="/buy-goods" element={<BuyGoods />} />
          <Route path="/bills" element={<Bills />} />
        </Routes>
      </div>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
