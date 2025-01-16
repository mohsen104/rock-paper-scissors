import { useState } from "react";
import { FaRegHandBackFist } from "react-icons/fa6";
import { LiaHandPaper, LiaHandRock, LiaHandScissors } from "react-icons/lia";
import Confetti from "react-confetti";

enum Play {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}

function App() {
  const [isHappy, setIsHappy] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(1);
  const [userPlay, setUserPlay] = useState<Play | null>(null);
  const [botPlay, setBotPlay] = useState<Play | null>(null);
  const [winCount, setWinCount] = useState<number>(0);
  const [loseCount, setLoseCount] = useState<number>(0);

  const getBotPlay = () => Math.floor(Math.random() * 3) + 1;

  const play = (user: Play) => {
    setIsHappy(false);
    setIsRunning(true);

    const interval = setInterval(() => {
      setTimer((state) => (state = state + 1));
    }, 1000);

    const bot = getBotPlay();

    setTimeout(() => {
      setUserPlay(user);
      setBotPlay(bot);
      clearInterval(interval);
      setTimer(1);
      setIsRunning(false);

      if (user !== bot) {
        if (
          (user === Play.Rock && bot === Play.Scissors) ||
          (user === Play.Paper && bot === Play.Rock) ||
          (user === Play.Scissors && bot === 2)
        ) {
          setIsHappy(true);
          setWinCount((state) => state + 1);
        } else {
          setLoseCount((state) => state + 1);
        }
      }
    }, 3000);

    setTimeout(() => setIsHappy(false), 10000);
  };

  const renderIcon = (play: Play | null, isBot: boolean = false) => {
    switch (play) {
      case Play.Rock:
        return (
          <LiaHandRock
            size={100}
            className={isBot ? "-rotate-90 -scale-x-100" : "rotate-90"}
          />
        );

      case Play.Paper:
        return (
          <LiaHandPaper
            size={100}
            className={isBot ? "-rotate-90 -scale-x-100" : "rotate-90"}
          />
        );

      case Play.Scissors:
        return (
          <LiaHandScissors size={100} className={isBot ? "-scale-x-100" : ""} />
        );

      default:
        return (
          <FaRegHandBackFist
            size={100}
            className={`rotate-90 ${isBot && "-scale-y-100"}`}
          />
        );
    }
  };

  return (
    <>
      <div className="bg-slate-100 w-screen h-screen flex flex-col gap-2 items-center justify-center">
        <div className="w-80 h-80 rounded-lg bg-white text-purple-600 shadow-md flex flex-col justify-between items-center p-5">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col items-center">
              <p className="font-medium">You ({winCount})</p>
              {renderIcon(userPlay)}
            </div>
            <div className="flex flex-col items-center">
              <p className="font-medium">Bot ({loseCount})</p>
              {renderIcon(botPlay, true)}
            </div>
          </div>
          <p className="font-medium">{isRunning ? timer : "Let's Play!!"}</p>
          <div className="grid grid-cols-3 w-full">
            <button
              disabled={isRunning}
              onClick={() => play(1)}
              className="disabled:cursor-not-allowed flex flex-col items-center hover:bg-purple-50 transition-all rounded-full py-1"
            >
              <LiaHandRock size={32} />
              <p>Rock</p>
            </button>
            <button
              disabled={isRunning}
              onClick={() => play(2)}
              className="disabled:cursor-not-allowed flex flex-col items-center hover:bg-purple-50 transition-all rounded-full py-1"
            >
              <LiaHandPaper size={32} />
              <p>Paper</p>
            </button>
            <button
              disabled={isRunning}
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
      {isHappy && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
    </>
  );
}

export default App;
