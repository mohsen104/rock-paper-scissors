import React, { useState } from "react";
import { FaRegHandBackFist } from "react-icons/fa6";
import { LiaHandPaper, LiaHandRock, LiaHandScissors } from "react-icons/lia";
import Confetti from "react-confetti";

function App() {
  const [happy, setHappy] = useState(false);

  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(1);
  const [userRun, setUserRun] = useState(0);
  const [botRun, setBotRun] = useState(0);
  const [winCount, setWinCount] = useState(0);
  const [loseCount, setLoseCount] = useState(0);

  function play(user) {
    setHappy(false);

    setRunning(true);

    const interval = setInterval(() => {
      setTime((state) => (state = state + 1));
    }, 1000);

    const bot = Math.floor(Math.random() * 3) + 1;

    setTimeout(() => {
      setUserRun(user);
      setBotRun(bot);
      clearInterval(interval);
      setTime(1);
      setRunning(false);

      if (user === bot) {
      } else if (
        (user === 1 && bot === 3) ||
        (user === 2 && bot === 1) ||
        (user === 3 && bot === 2)
      ) {
        setHappy(true);
        setWinCount((state) => (state = state + 1));
      } else {
        setLoseCount((state) => (state = state + 1));
      }
    }, 3000);

    setTimeout(() => {
      setHappy(false);
    }, 6000);
  }

  return (
    <>
      <div className="bg-slate-100 w-screen h-screen flex flex-col gap-2 items-center justify-center">
        <div className="w-80 h-80 rounded-lg bg-white text-purple-600 shadow-md flex flex-col justify-between items-center p-5">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col items-center">
              <p className="font-medium">User ({winCount})</p>
              {userRun == 0 && (
                <FaRegHandBackFist size={100} className="rotate-90" />
              )}
              {userRun == 1 && <LiaHandRock size={100} className="rotate-90" />}
              {userRun == 2 && (
                <LiaHandPaper size={100} className="rotate-90" />
              )}
              {userRun == 3 && <LiaHandScissors size={100} />}
            </div>
            <div className="flex flex-col items-center">
              <p className="font-medium">Bot ({loseCount})</p>
              {botRun == 0 && (
                <FaRegHandBackFist
                  size={100}
                  className="rotate-90 -scale-y-100"
                />
              )}
              {botRun == 1 && (
                <LiaHandRock size={100} className="-rotate-90 -scale-x-100" />
              )}
              {botRun == 2 && (
                <LiaHandPaper size={100} className="-rotate-90 -scale-x-100" />
              )}
              {botRun == 3 && (
                <LiaHandScissors size={100} className="-scale-x-100" />
              )}
            </div>
          </div>
          <p className="font-medium">{running ? time : "Let's Play!!"}</p>
          <div className="grid grid-cols-3 w-full">
            <button
              disabled={running}
              onClick={() => play(1)}
              className="disabled:cursor-not-allowed flex flex-col items-center hover:bg-purple-50 transition-all rounded-full py-1"
            >
              <LiaHandRock size={32} />
              <p>Rock</p>
            </button>
            <button
              disabled={running}
              onClick={() => play(2)}
              className="disabled:cursor-not-allowed flex flex-col items-center hover:bg-purple-50 transition-all rounded-full py-1"
            >
              <LiaHandPaper size={32} />
              <p>Paper</p>
            </button>
            <button
              disabled={running}
              onClick={() => play(3)}
              className="disabled:cursor-not-allowed flex flex-col items-center hover:bg-purple-50 transition-all rounded-full py-1"
            >
              <LiaHandScissors size={32} className="-rotate-90" />
              <p>Scissors</p>
            </button>
          </div>
        </div>
        <p className="text-xs">Made By Mohsen 😎</p>
      </div>
      {happy && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
    </>
  );
}

export default App;
