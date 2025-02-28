import z from "zod"

export type FieldErrors<T> = {
  [K in keyof T]?: string[]
}

export type ActionState<TInput, TOutput> = {
  FieldErrors?: FieldErrors<TInput>
  error?: string
  data?: TOutput
}

export const createAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (data: TInput) => Promise<ActionState<TInput, TOutput>>,
) => {
  return async (data: TInput) => {
    const result = schema.safeParse(data)
    if (!result.success) {
      return {
        FieldErrors: result.error.flatten().fieldErrors as FieldErrors<TInput>,
      }
    }
    return handler(data)
  }
}
