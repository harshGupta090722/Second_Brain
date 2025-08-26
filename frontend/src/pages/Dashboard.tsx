import { useState } from 'react'
import { Button } from '../Components/Button'
import { Card } from '../Components/Card'
import { CreateContentModel } from '../Components/CreateContentModel'
import { Plusicon } from '../icons/Plusicon'
import { Shareicon } from '../icons/Shareicon'
import { Sidebar } from '../Components/Sidebar'

export function Dashboard() {

    const [modelOpen, setModelOpen] = useState(false);
    return <div>
        <Sidebar />
        <div className="p-4 ml-76 min-h-screen bg-gray-100">
            <CreateContentModel open={modelOpen} onclose={() => {
                setModelOpen(false);
            }} />
            <div className="flex justify-end gap-4">
                <Button onClick={() =>
                    setModelOpen(true
                    )} variant="primary" text="Add Content" startIcon={<Plusicon />}></Button>
                <Button variant="secondary" text="Share Brain" startIcon={<Shareicon />}></Button>
            </div>
            <div className='flex gap-4'>
                <Card type="twitter" link="https://x.com/DeadlyLaw/status/1959936892490912011" title="First Tweet"></Card>
                <Card type="youtube" link="https://www.youtube.com/watch?v=6p8R6vFuFMI&ab_channel=100xDevs" title="First YouTube Video"></Card>
            </div>
        </div>
    </div>
}