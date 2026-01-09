import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-8 max-w-4xl">
        <h1 className="text-5xl font-bold text-text-primary">
          ⚔️ Avalon - The Resistance
        </h1>

        <p className="text-text-secondary text-lg">
          Vite + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Button variant="good" size="lg">
            ✓ Good Team
          </Button>
          <Button variant="evil" size="lg">
            ✗ Evil Team
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Interactive Demo</CardTitle>
            <CardDescription>
              Testing shadcn/ui components with Tailwind CSS
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => setCount((count) => count + 1)} size="lg">
              Count: {count}
            </Button>
            <div className="flex gap-2 flex-wrap justify-center">
              <Button variant="good">Good</Button>
              <Button variant="evil">Evil</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="bg-merlin border-none text-white">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl mb-2">🧙</div>
              <div className="font-semibold text-lg">Merlin</div>
              <div className="text-sm opacity-90">Good</div>
            </CardContent>
          </Card>
          <Card className="bg-morgana border-none text-white">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl mb-2">🔮</div>
              <div className="font-semibold text-lg">Morgana</div>
              <div className="text-sm opacity-90">Evil</div>
            </CardContent>
          </Card>
          <Card className="bg-perceival border-none text-white">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl mb-2">🛡️</div>
              <div className="font-semibold text-lg">Perceival</div>
              <div className="text-sm opacity-90">Good</div>
            </CardContent>
          </Card>
          <Card className="bg-assassin border-none text-white">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl mb-2">🗡️</div>
              <div className="font-semibold text-lg">Assassin</div>
              <div className="text-sm opacity-90">Evil</div>
            </CardContent>
          </Card>
          <Card className="bg-modred border-none text-white">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl mb-2">⚔️</div>
              <div className="font-semibold text-lg">Modred</div>
              <div className="text-sm opacity-90">Evil</div>
            </CardContent>
          </Card>
          <Card className="bg-oberon border-none text-white">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl mb-2">👁️</div>
              <div className="font-semibold text-lg">Oberon</div>
              <div className="text-sm opacity-90">Evil</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default App
