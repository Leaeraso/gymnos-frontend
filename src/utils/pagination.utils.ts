export const calculateTotalPages = (total: number, pageSize: number | undefined | null) => {
    return Math.ceil(total / (pageSize ?? 10))
}