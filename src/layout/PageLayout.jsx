import {  Outlet } from "react-router-dom";

function Header() {
  return (
    <header>
      {/*<nav>
        <ul>
          <li>
            
          </li>
          <li>
            <Link to={"/tasks/3/details"}> Task</Link>{" "}
          </li>
          <li>
            <Link to={"/tasks/3/edit"}> Edit Task</Link>{" "}
          </li>
          <li>
            <Link to={"/tasks/add"}> Add Task</Link>{" "}
          </li>
        </ul>
      </nav>*/}
    </header>
  );
}

function Footer() {
  return <footer>Footer</footer>;
}

export default function PageLayout({ children }) {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
