export const formatToBritishDate = (date: string): Date | undefined => {
    const parts = date.split("/")
    
    const day = parseInt(parts[0])
    const month = parseInt(parts[1])
    const year = parseInt(parts[2])

    if(!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        return new Date(year, month - 1, day)
    }

    return undefined
}

export const formatDateToAPI = (date: string): string => {
    return date.split('/').reverse().join('-')
}