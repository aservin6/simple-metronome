import { useState, ChangeEvent, useRef } from "react";
import { IoIosAdd, IoIosRemove, IoIosPlay, IoIosPause } from "react-icons/io";
import TimeSignature from "./TimeSignature";

export default function Metronome() {
  const defaultBPM = 60;
  const lowBPM = 40;
  const highBPM = 300;
  const audioRef = useRef(new Audio());

  const [userBPM, setUserBPM] = useState(defaultBPM);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerID, setTimerID] = useState<number>();

  const [timeSignature, setTimeSignature] = useState(0);

  const increaseBPM = () => {
    stopMetronome();
    if (userBPM + 1 > highBPM) {
      return;
    }
    setUserBPM(userBPM + 1);
    if (isPlaying) {
      startMetronome();
    }
  };
  const decreaseBPM = () => {
    stopMetronome();
    if (userBPM - 1 < lowBPM) {
      return;
    }
    setUserBPM(userBPM - 1);
    if (isPlaying) {
      startMetronome();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserBPM(parseInt(e.target.value));
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    stopMetronome();
    const value = parseInt(e.target.value);
    if (isNaN(value)) {
      setUserBPM(defaultBPM);
    } else if (value >= highBPM) {
      setUserBPM(highBPM);
    } else if (value < lowBPM) {
      setUserBPM(lowBPM);
    } else {
      setUserBPM(value);
    }
  };

  const startStopToggle = () => {
    if (isPlaying) {
      stopMetronome();
    } else {
      startMetronome();
    }
  };

  const checkTimeSig = () => {
    switch (timeSignature) {
      case 0:
        return 4;
      case 1:
        return 3;
      case 2:
        return 5;
    }
  };

  const startMetronome = () => {
    let count = 0;
    const interval = 60000 / userBPM;

    const timerID = setInterval(() => {
      const beatsPerMeasure = checkTimeSig();
      count++;
      if (count === 1) {
        playMetronomeHi();
      } else {
        playMetronomeLo();
      }
      if (count === beatsPerMeasure) {
        count = 0;
      }
    }, interval);

    setTimerID(timerID);

    setIsPlaying(true);
  };

  const stopMetronome = () => {
    clearInterval(timerID);
    setTimerID(undefined);
    setIsPlaying(false);
  };

  const playMetronomeHi = () => {
    audioRef.current.src = "/Metronomes/Perc_MetronomeQuartz_hi.wav";
    audioRef.current.play();
  };

  const playMetronomeLo = () => {
    audioRef.current.src = "/Metronomes/Perc_MetronomeQuartz_lo.wav";
    audioRef.current.play();
  };

  return (
    <div className="w-full rounded-md bg-slate-800 px-3 py-6">
      <div className="mx-auto w-fit">
        {/* BPM Screen */}
        <div className="mb-2 text-8xl font-semibold">
          <input
            className="mr-2 max-w-44 rounded-xl bg-slate-800 text-center outline-none hover:bg-slate-900 focus:bg-slate-900"
            type="number"
            name="Beats Per Minute"
            id="BPM"
            onChange={handleChange}
            onBlur={handleBlur}
            value={userBPM}
            max={highBPM}
            min={lowBPM}
            aria-label="BPM Screen"
          ></input>
          <span className="text-base">BPM</span>
        </div>
        {/* Function Buttons */}
        <div className="mx-auto flex w-full items-center space-x-5">
          <button
            onClick={startStopToggle}
            className="rounded-full bg-green-500 p-2 text-4xl hover:bg-green-400"
            aria-label="Start/Stop Toggle"
          >
            {!isPlaying ? (
              <IoIosPlay className="pl-1" />
            ) : (
              <IoIosPause className="pl-1" />
            )}
          </button>

          <button
            onClick={decreaseBPM}
            className="rounded-full bg-fuchsia-500 p-1.5 text-3xl hover:bg-fuchsia-400"
            aria-label="Decrease BPM"
          >
            <IoIosRemove />
          </button>
          <button
            onClick={increaseBPM}
            className="rounded-full bg-fuchsia-500 p-1.5 text-3xl hover:bg-fuchsia-400"
            aria-label="Increase BPM"
          >
            <IoIosAdd />
          </button>
        </div>
        <TimeSignature
          setTimeSignature={setTimeSignature}
          stopMetronome={stopMetronome}
          isPlaying={isPlaying}
          aria-label="Select Time Signature"
        />
      </div>
    </div>
  );
}
