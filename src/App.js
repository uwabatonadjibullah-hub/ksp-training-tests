import logo1 from 'logo.png';         // Main logo
import logo2 from 'ksp-logo.jpg';     // Alternate logo
import './App.css';

const useLogo = true; // Toggle this to switch logos

function App() {
  const logo = useLogo ? logo1 : logo2;

  return (
    <div className="App">
      <h1>Welcome to KSP Camera Training 📸</h1>
      <p>This platform will guide you through every step of your camera journey.</p>
      <header className="App-header filmmaking-video"> {/* Updated class name */}
        <img src={logo} className="App-logo" alt="KSP Logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;