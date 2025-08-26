import './App.css'
import { Button } from './Components/Button'
import { Card } from './Components/Sidebar'
import { Plusicon } from './icons/Plusicon'
import { Shareicon } from './icons/Shareicon'

function App() {

  return <>
    <Button variant="primary" text="Add Content" startIcon={<Plusicon />}></Button>
    <Button variant="secondary" text="Share Brain" startIcon={<Shareicon />}></Button>
    <Card type="twitter" link="https://x.com/DeadlyLaw/status/1959936892490912011" title="First Tweet"></Card>
    <Card type="youtube" link="https://www.youtube.com/watch?v=6p8R6vFuFMI&ab_channel=100xDevs" title="First YouTube Video"></Card>
  </>
}

export default App