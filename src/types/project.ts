import { Site } from "./site"

export type Project = {
    name: string,
    description?: string,
    sites?: Site[]
}