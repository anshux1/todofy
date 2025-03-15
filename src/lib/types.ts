import { authClient } from "./auth.config"

export type SessionUser = typeof authClient.$Infer.Session.user
