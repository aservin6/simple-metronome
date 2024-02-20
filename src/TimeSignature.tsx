import { ChangeEvent } from "react";

export default function TimeSignature({
  setTimeSignature,
  stopMetronome,
  isPlaying,
}: {
  setTimeSignature: (value: number) => void;
  stopMetronome: () => void;
  isPlaying: boolean;
}) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTimeSignature(parseInt(e.target.value));
    if (isPlaying) {
      stopMetronome();
    }
  };

  return (
    <div className="mt-10 text-left">
      <h3 className="text-lg font-semibold">Time Signature</h3>
      <select
        className="mt-1.5 rounded-md bg-slate-700 py-1 pl-1 pr-3 text-xl"
        name=""
        id=""
        onChange={handleChange}
      >
        <option value={0}>4/4</option>
        <option value={1}>3/4</option>
        <option value={2}>5/4</option>
      </select>
    </div>
  );
}
