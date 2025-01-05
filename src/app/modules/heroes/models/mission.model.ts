import { MonsterModel } from "./monster.model";

export interface MissionModel {
    id: number;
    name: string;
    levelRequirement: number;
    description: string;
    rewardExperience: number;
    monsters: MonsterModel[];
    missionFailed: boolean;
}
