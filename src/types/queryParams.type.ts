export type QueryParams = {
    page: number
    page_size: number
    search?: string | null
    sort: string
    sort_dir: 'ASC' | 'DESC'
}