import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import NotFound from './pages/NotFound';


function App() {
  return (
    <Router>
        <div className="d-flex flex-column justify-content-between main-wrapper">
          <Navbar></Navbar>
          <main className="container mx-auto px-3 pb-12">
          <Routes>

              <Route path='/' element={<Home/>}/>
              <Route path='/*' element={<NotFound/>}/>
          </Routes>
          </main>
          <Footer></Footer>
        </div>
    </Router>
  );
}

export default App;
