import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import progressRecords from "@data/progress_records.json";
import './App.css'

/* LevelRecord Obj Example
"demon_id":698,
"demon":"Society",
"position":3,
"requirement":66,
"player":"ChopBlox",
"progress":71
*/

type LevelRecord = {
    demon_id: number;
    demon: string;
    position: number;
    reqirement: number;
    player: string;
    progress: number;
}

/*
- Search for records pertaining to Slaughterhouse
- Slaughterhouse was selected due to it having the most amount of records to work with
*/

function App() {

    const SLAUGHTERHOUSE_ID = 380;
    const records = progressRecords as LevelRecord[];
    const slaughterhouseRecords = records.filter(r => r.demon_id === SLAUGHTERHOUSE_ID);

    const counts: Record<number, number> = {};
    for (const r of slaughterhouseRecords) {
        counts[r.progress] = (counts[r.progress] ?? 0) + 1;
    }

    const maxCount = Math.max(...Object.values(counts));
    const modes = Object.keys(counts).filter(p => counts[Number(p)] === maxCount).map(Number);


    return(
        <div>
            <h1>{slaughterhouseRecords[0]?.demon}</h1>
            <p>{slaughterhouseRecords.length} progress records</p>
            <p>
                Worst Chokepoint: {modes.join("%, ")}%
            </p>
            <ul>
                {slaughterhouseRecords.map(r => (
                    <li key={r.player}>
                        {r.progress}%
                    </li>
                ))}
            </ul>
        </div>
    );
  
}

export default App