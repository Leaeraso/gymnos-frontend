"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AffiliateState } from "./affiliate-state";
import { ArrowUpDown, Eye, Mars, Pencil, Trash, Venus } from "lucide-react";
import { Button } from "./ui/button";
import { useAffiliates } from "@/hooks/use-affiliates";
import { PaginationBuilder } from "./pagination-builder";
import { calculateTotalPages } from "@/utils/pagination.utils";
import { Input } from "./ui/input";
import { AffiliateSex } from "@/types/affiliates.type";
import { AffiliateModal } from "./affiliate-modal";

export function AffiliatesTable() {
  const { data, isLoading, isFetching, queryParams, setQueryParams } = useAffiliates()

  const affiliates = data?.data ?? []
  const totalPages = calculateTotalPages(data?.paginate?.total!, data?.paginate?.pageSize)

  const handlePageChange = (page: number) => {
    setQueryParams({...queryParams, page})
  }
 
  return (
    <>
    <div className="overflow-x-auto w-full">
      <div className="flex items-center py-4 flex-row justify-between">
        <Input
          placeholder="Buscar afiliado..."
          className="max-w-sm"
        />
        <AffiliateModal isLoading={isLoading} isFetching={isFetching}/>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">N° afiliado</TableHead>
            <TableHead className="text-center">
              <Button
                variant="ghost"
                onClick={() => {}}
              >
                Nombre completo
                <ArrowUpDown className="w-4 h-4" />
              </Button>
            </TableHead>
            <TableHead className="text-center">Fecha Nacimiento</TableHead>
            <TableHead className="text-center">Documento</TableHead>
            <TableHead className="text-center">Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {affiliates.map((affiliate) => {
            console.log(affiliate);
            const normalizedDob = affiliate.date_of_birth
              .slice(0, 10)
              .replace(/-/g, "/") ?? 'Fecha no disponible';

            return (
              <TableRow key={affiliate.affiliate_number}>
                <TableCell className="text-left">{affiliate.affiliate_number}</TableCell>
                <TableCell className="text-center">
                  <div className="flex gap-x-1 flex-row justify-center">
                    <span>
                      {affiliate.sex === AffiliateSex.Woman ? (
                        <Venus className="w-5 h-5" />
                      ) : (
                        <Mars className="w-5 h-5" />
                      )}
                    </span>
                    <span>{affiliate.name + " " + affiliate.last_name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">{normalizedDob}</TableCell>
                <TableCell className="text-center">{affiliate.dni}</TableCell>
                <TableCell className="text-center">
                  <AffiliateState state={affiliate.paid} />
                </TableCell>
                <TableCell className="flex gap-x-2 justify-end">
                  <Button variant="outline" size="icon" className="cursor-pointer">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="cursor-pointer">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="cursor-pointer">
                    <Trash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>

      {
        affiliates.length > 0 && (
          <div className="mt-4">
            <PaginationBuilder page={queryParams.page} totalPages={totalPages} setPage={handlePageChange}/>
          </div>
        )
      }
    </> 
  );
}
