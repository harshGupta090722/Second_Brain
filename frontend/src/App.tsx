import './App.css'
import { Button } from './components/ui/Button'

function App() {

  return (
    <>
      <Button
        variant="primary"
        size="md"
        text="Share"
        onClick={() => alert("Button Clicked!")}
        startIcon={<span>🔥</span>}
        endIcon={<span>➡️</span>}
      />
      <Button
        variant="secondary"
        size="md"
        text="Add Content"
        onClick={() => alert("Button Clicked!")}
        startIcon={<span>🔥</span>}
        endIcon={<span>➡️</span>}
      />
    </>
  )
}

export default App

//Use hericons for icons tomorrow.