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

export const formatDateInputValue = (inputDate: string): string=> {
    const cleaned = inputDate.replace(/\D/g, "")

  let formatted = cleaned

  if (cleaned.length > 2) {
    formatted = cleaned.slice(0, 2) + "/" + cleaned.slice(2)
  }
  if (cleaned.length > 4) {
    formatted = formatted.slice(0, 5) + "/" + formatted.slice(5)
  }
  if (cleaned.length > 8) {
    formatted = formatted.slice(0, 10)
  }

  return formatted
}