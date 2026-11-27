import { Link } from "react-router-dom";
import levelsData from "@data/levels.json"
import type { Level } from "./types";

// copy of list levels that will be used later
const levels = [...(levelsData as Level[])].sort((a,b) => a.position - b.position);

function LevelList() {
    return (
        <>
            <div className="navigationBar">
                CHOKEPOINT DETECTOR
            </div>

            {/*levels are displayed based on their rank ex. #1 - GRIEF, #2 - Artemis 13... #150 - SPIRIT OVERLOCK*/}
            <div className = "container">
                <div className = "card">
                    <h2>Top 150 List</h2>
                        <ul className="record-list">
                            {levels.map(level => (
                                <li key={level.id}>

                                    {/*this allows for users to view more details about records and progress distribution*/}
                                    
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