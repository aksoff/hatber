export interface User {
  email: string
  password: string
}

export interface Performer {
  name: string
  label?: string
  _id?: string
}

export interface Category {
  name: string
  _id?: string
}

export interface Position {
  name: string
  cost: number
  category: string
  user?: string
  _id?: string
}

export interface Message {
  message: string
}
