import { BrowserRouter as Router, Routes, Route } from "react-router";

import Menu from "./components/Menu";
import AnecdoteList from "./components/AnecdoteList";
import About from "./components/About";
import Footer from "./components/Footer";
import CreateNew from "./components/CreateNew";

const App = () => {
  return (
    <Router>
      <div className="shell">
        <header>
          <div className="masthead">
            <span className="logo" aria-hidden="true">“</span>
            <h1>Software anecdotes</h1>
          </div>
          <Menu />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<AnecdoteList />} />
            <Route path="/create" element={<CreateNew />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
