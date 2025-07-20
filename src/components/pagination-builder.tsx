import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

type Props = {
    page: number | 1
    totalPages: number | 1,
    setPage: (page: number) => void
}

export function PaginationBuilder({ page, totalPages, setPage }: Props) {

    const goToPage = (page: number) => {
        if(page >= 1 && page <= totalPages) setPage(page)
    }
    return (
        <Pagination>
            <PaginationContent>
                {
                    page > 1 && (
                        <>
                        <PaginationItem>
                            <PaginationPrevious onClick={() => goToPage(page - 1)} className="cursor-pointer"/>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink onClick={() => goToPage(page - 1)} className="cursor-pointer">{page - 1}</PaginationLink>
                        </PaginationItem>
                        </>
                    )
                }
                
                <PaginationItem>
                    <PaginationLink isActive className="cursor-pointer">{page}</PaginationLink>
                </PaginationItem>
                {
                    page < (totalPages - 1) && (
                        <>
                        <PaginationItem>
                            <PaginationLink onClick={() => goToPage(page + 1)} className="cursor-pointer">{page + 1}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis/>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink onClick={() => goToPage(page + 2)} className="cursor-pointer">{page + 2}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext onClick={() => goToPage(page + 1)} className="cursor-pointer"/>
                        </PaginationItem>
                        </>
                    )
                }
            </PaginationContent>
        </Pagination>
    )
}