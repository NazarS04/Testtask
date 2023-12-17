export interface IPosition {
  id: number
  name: string
}

export interface IPositionResponse {
  success: boolean
  positions: IPosition[]
}