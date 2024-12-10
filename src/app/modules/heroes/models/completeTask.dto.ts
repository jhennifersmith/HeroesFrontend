import { AttributesDto } from "./attributes.dto";

export interface CompleteTaskResponseDto {
  taskId: number;
  taskTitle: string;
  attributesGained: AttributesDto;
  experienceGained: number;
  levelUpCount: number;
}