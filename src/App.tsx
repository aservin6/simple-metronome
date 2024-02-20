import Metronome from "./Metronome";

function App() {
  return (
    <>
      <div className="min-h-screen cursor-default bg-slate-900 px-4 text-slate-200">
        {/* Container */}
        <div className="mx-auto max-w-6xl py-4">
          <h1 className="py-4 text-4xl font-bold" aria-label="Heading">
            Metronome
          </h1>
          {/* Metronome */}
          <div>
            <Metronome />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
