import type { Hono } from "hono"

type Bindings<B> = {}

type Variables<V> = {
    API_KEY: string
}

export type ApplicationOptions<B = {}, V = {}> = {
    Bindings: Bindings<B>
    Variables: Variables<V>
}
export interface IRoutes  {
    MainRoutes(baseUrl?: string): Hono<any, any>
}