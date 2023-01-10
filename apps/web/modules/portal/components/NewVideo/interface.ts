// Template Details interface
export interface TemplateDetails {
  id: string
  name: string
  description: string
  orientation: string
  duration: number
  imageUrl: string
  vimeoId?: string
  category: string
  status: TemplateTypes
}

export enum TemplateTypes {
  Default,
  Approved,
  Requested,
  Locked,
}
