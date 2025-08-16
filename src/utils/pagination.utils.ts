export const calculateTotalPages = (total: number, pageSize: number | undefined | null) => {
    return Math.ceil(total / (pageSize ?? 10))
}

export const getPageNumbers = (page: number, totalPages: number) => {
    const delta = 2
    const pages: number[] = []
    const start = Math.max(1, page - delta)
    const end = Math.min(totalPages, page + delta)

    for(let i = start; i <= end; i++) {
        pages.push(i)
    }
    
    return pages
}

export const normalizeDate = (date: string | undefined) => {
    if(date === undefined) {
        return 'Fecha no disponible'
    }

    return date.slice(0, 10)
        .replace(/-/g, "/")
}

export const normalizeFullName = (name: string | undefined, lastName: string | undefined) => {
    if(name === undefined) {
        return 'Nombre no disponible'
    }

    return `${name} ${lastName ?? ''}`
}