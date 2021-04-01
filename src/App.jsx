import Profile from './pages/Profile';
import { About, Contact } from './pages/About';
import Home from './pages/Home';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './style.css';

function App() {
    return <div className="App">
        <BrowserRouter>
            <Link to="/" className="nav-link">Home</Link>
            <Route exact path="/" component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
        </BrowserRouter>
    </div>
}

export default App;