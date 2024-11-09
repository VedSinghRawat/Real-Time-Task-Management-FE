import { Entity } from './base.entity'

export interface Project extends Entity {
  title: string
  description: string
  public: boolean
  ownerId: number
}
