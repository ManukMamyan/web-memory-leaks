import { BrowserRouter, Route, Routes } from "react-router-dom";
import Demo1 from "./pages/Demo1.tsx";
import Demo2 from "./pages/Demo2.tsx";
import Demo3 from "./pages/Demo3.tsx";
import Demo4 from "./pages/Demo4.tsx";
import Demo5 from "./pages/Demo5.tsx";
import Home from "./pages/Home.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/demo-1" element={<Demo1 />} />
                <Route path="/demo-2" element={<Demo2 />} />
                <Route path="/demo-3" element={<Demo3 />} />
                <Route path="/demo-4" element={<Demo4 />} />
                <Route path="/demo-5" element={<Demo5 />} />
            </Routes>
        </BrowserRouter>
    );
}
