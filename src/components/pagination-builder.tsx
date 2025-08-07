import { getPageNumbers } from "@/utils/pagination.utils";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

type Props = {
    page: number
    totalPages: number,
    setPage: (page: number) => void
}

export function PaginationBuilder({ page, totalPages, setPage }: Props) {
    const pages = getPageNumbers(page, totalPages)

    const goToPage = (n: number) => {
        if(n >= 1 && n <= totalPages) setPage(n)
    }

    const isDisabled = totalPages < 2

    return (
        <Pagination>
            <PaginationContent className="gap-2">
                <PaginationItem>
                    <PaginationPrevious 
                        onClick={isDisabled ? undefined : () => goToPage(page - 1)} 
                        className={`${!isDisabled ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                    />
                </PaginationItem>

                {
                    pages[0] > 1 && (
                        <>
                            <PaginationItem>
                                <PaginationLink onClick={() => goToPage(1)} className="cursor-pointer">1</PaginationLink>
                            </PaginationItem>
                            {
                                pages[0] > 2 && (
                                    <PaginationItem>
                                        <PaginationEllipsis/>
                                    </PaginationItem>
                                )
                            }
                        </>
                    )
                }

                {
                    pages.map((p: number) => (
                        <PaginationItem key={p}>
                            <PaginationLink onClick={() => goToPage(p)} isActive={p === page} className="cursor-pointer">
                                {p}
                            </PaginationLink>
                        </PaginationItem>
                    ))
                }

                {
                    pages[pages.length - 1] < totalPages && (
                        <>
                            {pages[pages.length - 1] < totalPages - 1 && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}
                            <PaginationItem>
                                <PaginationLink onClick={() => goToPage(totalPages)} className="cursor-pointer">
                                    {totalPages}
                                </PaginationLink>
                            </PaginationItem>
                        </>
                    )
                }

                <PaginationItem>
                    <PaginationNext 
                        onClick={isDisabled ? undefined : () => goToPage(page + 1)} 
                        className={`${!isDisabled ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}