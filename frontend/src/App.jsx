import "./App.css";
import Footer from "./components/structure/Footer";
import Header from "./components/structure/Header";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col 2xl:max-w-[60%] lg:max-w-[80%] items-center">
      <Header />
      <div className="w-full flex-grow flex">
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
