import './App.css'
import { Button } from './components/ui/Button'
import { Plusicon } from './components/icons/Plusicon.tsx'
import { Rocketicon } from './components/icons/Rocketicon.tsx'

function App() {

  return (
    <>
      <Button
        variant="primary"
        size="md"
        text="Share"
        onClick={() => alert("Button Clicked!")}
        startIcon={<Plusicon/>}
        endIcon={<Rocketicon/>}
      />
    </>
  )
}

export default App