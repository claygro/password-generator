import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  // useCallback is a react hook that lets you cache a funciton definition between re-renders
  // for useRef hooks. Start of useRef hooks
  const passwordRef = useRef(null);
  // end of useRef hooks
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "1234567890";
    }
    if (charAllowed) {
      str += "@#$%&*!";
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);
  // for copy the password 👇
  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, password.length);
    window.navigator.clipboard.writeText(password);
  }, [password]);
  useEffect(() => {
    passwordGenerator();
    // call password generator
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <>
      <div className="font-sans my-40">
        <main
          className=" w-full max-w-md mx-auto  shadow-md rounded-lg px-4
        pb-10  text-orange-500 bg-gray-800"
        >
          <h1 className="text-white text-center text-4xl mt-4 mb-10">
            Password generator
          </h1>
          <main className="flex shadow-lg rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              className="outline-none bg-blue-900 px-4 py-3 text-white"
              onClick={copyPassword}
            >
              Copy
            </button>
          </main>
          <div className="flex flex-wrap text-sm gap-x-2">
            <div className="flex item-center gap-x-1">
              <input
                type="range"
                min={5}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => setLength(e.target.value)}
              />
              <label>Length:{length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => setNumberAllowed((prev) => !prev)}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className="flex item-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              <label htmlFor="characterInput">Characters</label>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
