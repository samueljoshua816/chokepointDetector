export type Level = {
    id: number;
    name:string;
    position: number;
    requirement: number;
};

export type LevelRecord = {
    demon_id: number;
    demon: string;
    position: number;
    requirement: number;
    player: string;
    progress: number;
};