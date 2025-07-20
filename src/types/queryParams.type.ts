export type QueryParams = {
    page?: number
    pageSize?: number
    search?: string | null
    sort?: string
    sort_dir?: 'ASC' | 'DESC'
}