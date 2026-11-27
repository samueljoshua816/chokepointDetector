import { Link } from "react-router-dom";
import levelsData from "@data/levels.json"
import type { Level } from "./types";

const levels = [...(levelsData as Level[])].sort((a,b) => a.position - b.position);

function LevelList() {
    return (
        <>
            <div className="navigationBar">
                CHOKEPOINT DETECTOR
            </div>

            <div className = "container">
                <div className = "card">
                    <h2>Top 150 List</h2>
                    <ul className="record-list">
                        {levels.map(level => (
                            <li key={level.id}>
                                <Link to={`/level/${level.id}`} className="level-link">
                                    #{level.position} - {level.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default LevelList;