import { Entity } from './base.entity'

const ROLE = ['team_leader', 'member', 'owner'] as const
export type Role = (typeof ROLE)[number]

export interface ProjectUser extends Omit<Entity, 'createdAt'> {
  projectId: number
  userId: number
  role: Role
}
