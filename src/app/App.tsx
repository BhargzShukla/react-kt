import {useState} from "react";
import logo from "~/assets/logo.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="text-center">
      <header className="bg-[#282c34] min-h-screen flex flex-col items-center justify-center text-[length:var(--font-size)] text-white">
        <img
          src={logo}
          className="h-[40vmin] pointer-events-none motion-reduce:animate-none animate-spin-slow"
          alt="logo"
        />
        <p>Hello Vite + React!</p>
        <p>
          <button
            type="button"
            className="text-[length:var(--font-size)] bg-gray-50 px-2 py-1 text-gray-700"
            onClick={() => setCount(count => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="text-[#61dafb] hover:underline"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer">
            Learn React
          </a>
          {" | "}
          <a
            className="text-[#61dafb] hover:underline"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer">
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
