export interface IUser {
  id: number
  name: string
  email: string
  phone: string
  position: string
  position_id: number
  registration_timestamp: number
  photo: string
}

export interface IUserResponse {
  success: boolean
  total_pages: number,
  total_users: number,
  count: number,
  page: number,
  links: {
    next_url: string | null
    prev_url: string | null
  },
  users: IUser[]
}