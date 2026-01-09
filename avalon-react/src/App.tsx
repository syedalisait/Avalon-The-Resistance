import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-8 max-w-4xl">
        <h1 className="text-5xl font-bold text-text-primary">
          ⚔️ Avalon - The Resistance
        </h1>

        <p className="text-text-secondary text-lg">
          Vite + React 19 + TypeScript + Tailwind CSS v4
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <div className="px-6 py-3 bg-good rounded-lg text-white font-semibold">
            ✓ Good Team
          </div>
          <div className="px-6 py-3 bg-evil rounded-lg text-white font-semibold">
            ✗ Evil Team
          </div>
        </div>

        <div className="bg-bg-secondary rounded-xl p-8 space-y-4 border border-border">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="px-6 py-3 bg-accent hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors"
          >
            Count: {count}
          </button>

          <p className="text-text-secondary text-sm">
            Tailwind CSS is configured! Click the button to test reactivity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-merlin p-6 rounded-lg text-white">
            <div className="text-3xl mb-2">🧙</div>
            <div className="font-semibold text-lg">Merlin</div>
            <div className="text-sm opacity-90">Good</div>
          </div>
          <div className="bg-morgana p-6 rounded-lg text-white">
            <div className="text-3xl mb-2">🔮</div>
            <div className="font-semibold text-lg">Morgana</div>
            <div className="text-sm opacity-90">Evil</div>
          </div>
          <div className="bg-perceival p-6 rounded-lg text-white">
            <div className="text-3xl mb-2">🛡️</div>
            <div className="font-semibold text-lg">Perceival</div>
            <div className="text-sm opacity-90">Good</div>
          </div>
          <div className="bg-assassin p-6 rounded-lg text-white">
            <div className="text-3xl mb-2">🗡️</div>
            <div className="font-semibold text-lg">Assassin</div>
            <div className="text-sm opacity-90">Evil</div>
          </div>
          <div className="bg-modred p-6 rounded-lg text-white">
            <div className="text-3xl mb-2">⚔️</div>
            <div className="font-semibold text-lg">Modred</div>
            <div className="text-sm opacity-90">Evil</div>
          </div>
          <div className="bg-oberon p-6 rounded-lg text-white">
            <div className="text-3xl mb-2">👁️</div>
            <div className="font-semibold text-lg">Oberon</div>
            <div className="text-sm opacity-90">Evil</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
