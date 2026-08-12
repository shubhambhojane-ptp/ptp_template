import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router";
import Home from "./pages/Home";
import DealsPage from "./pages/DealsPage";
import EventsPage from "./pages/EventsPage";
import ListingsPage from "./pages/ListingsPage";
import SearchPage from "./pages/SearchPage";
import BottomTab, { type BottomTabKey } from "./components/BottomTab";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [activeTab, setActiveTab] = useState<BottomTabKey>("map");
  const navigate = useNavigate();

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      <BottomTab
        active={activeTab}
        onMapClick={() => setActiveTab("map")}
        onBrowseClick={() => {
          setActiveTab("browse");
          navigate("/search", { flushSync: true });
          document.getElementById("search-input")?.focus();
        }}
        onAddClick={() => console.log("add pin")}
      />
    </>
  );
}

export default App;
