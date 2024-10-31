import { CategoryEnum } from "./category.enum"
import { DurationEnum } from "./duration.enum"

export interface UserTaskModel {
    id?: number
    title: string
    category: CategoryEnum
    duration: DurationEnum
    status: boolean
    creationDate: Date
}
