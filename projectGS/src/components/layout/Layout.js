import Header from "./Header";
import Footer from "./Footer";
import { Outlet, Link, useNavigate } from "react-router-dom";
const Layout = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
export default Layout;
