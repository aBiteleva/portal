export type BlockType = {
    code: string,
    description: string,
    categoryEvent?: string,
    category?: string,
    contextParam?: {
        description: string
    },
    component?: {
        description: string
    }[]
}
