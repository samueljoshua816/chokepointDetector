import {Link, useParams} from "react-router-dom"
import levelsData from "@data/levels.json"
import progressRecords from "@data/progress_records.json";
import type {Level, LevelRecord} from "./types"
import DeathBar from "./DeathBar";
import './App.css'

const levels = levelsData as Level[]
const allProgress = progressRecords as LevelRecord[]

function LevelPage() {
    const {id} = useParams();
    const levelId = Number(id);

    const level = levels.find(l => l.id === levelId);
    const records = allProgress.filter( r => r.demon_id === levelId);

    // err: level unreachable/ doesnt exist
    if(!level) {
        return (
            <div className="container">
                <p>Error: Level not found. <Link to="/">Back to Levels</Link></p>
            </div>    
        )
    }

    // stores every progress record for later use
    const counts: Record<number, number> = {};
    for (const r of records) {
        counts[r.progress] = (counts[r.progress] ?? 0) + 1;
    }

    const maxCount = Math.max(...Object.values(counts));
    // finds chokepoints based on mode
    const modes = Object.keys(counts).filter(p => counts[Number(p)] === maxCount).map(Number);


    return(
        <>
            <div className="navigationBar">
                <Link to="/" className="nav-home">CHOKEPOINT DETECTOR</Link>
            </div>

            <div className="container">
                <Link to="/" className="back-link">Back to Levels</Link>

                {
                /*Outputs level rank and name
                if the level has progress records associated with it, the page shows them, along with the mode of progress records
                otherwise the page tells the user the level has only completion records   */
                }

                <div className="card">
                    <h1>#{level.position} - {level.name}</h1>
                    <p className = "stat"> {records.length} progress records</p>
                    {records.length > 0 ?  (
                        <>
                            <p className="stat">
                                Worst Chokepoint(s): {modes.join("%, ")}%
                            </p>
                            <DeathBar records={records} />
                        </>
                    ) : (
                        <p className="stat">No progress records for this Level</p>
                    )}
                    
                </div>

                {records.length > 0 && (
                    <div className = "card">
                        <h2>Progress Records</h2>    
                        <ul className="record-list">
                            {records.map(r => (
                                <li key={r.player}>
                                    <span>{r.player} - </span>
                                    <span>{r.progress}%</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}

export default LevelPage