import './App.css'
import { Button } from './components/ui/Button'

function App() {

  return (
    <>
      <Button
        variant="primary"
        size="md"
        text="Click Me"
        onClick={() => alert("Button Clicked!")}
        startIcon={<span>🔥</span>}
        endIcon={<span>➡️</span>}
      />
    </>
  )
}

export default App