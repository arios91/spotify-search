import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import { SpotifyReducer } from './components/context/spotify/SpotifyContext';


function App() {
  return (
    <SpotifyReducer>
      <Router>
          <div className="d-flex flex-column justify-content-between main-wrapper">
            <Navbar></Navbar>
            <main className="container mx-auto px-3 pb-12">
            <Routes>

                <Route path='/' element={<Home/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/*' element={<NotFound/>}/>
            </Routes>
            </main>
            <Footer></Footer>
          </div>
      </Router>
    </SpotifyReducer>
  );
}

export default App;
