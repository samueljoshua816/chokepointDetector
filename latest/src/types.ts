/* Level Obj Example
"id": 728,
    "name": "GRIEF",
    "position": 1,
    "requirement": 76
*/

export type Level = {
    id: number;
    name:string;
    position: number;
    requirement: number;
};

/* LevelRecord Obj Example
"demon_id":698,
"demon":"Society",
"position":3,
"requirement":66,
"player":"ChopBlox",
"progress":71
*/

export type LevelRecord = {
    demon_id: number;
    demon: string;
    position: number;
    requirement: number;
    player: string;
    progress: number;
};