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
import { Eye, Mars, Pencil, Trash, Venus } from "lucide-react";
import { Button } from "./ui/button";
import { useAffiliates } from "@/hooks/use-affiliates";
import { Pagination } from "./ui/pagination";
import { PaginationBuilder } from "./pagination-builder";

export function AffiliatesTable() {
  const { data, isLoading, isError, page, setPage } = useAffiliates()

  const affiliates = data?.data ?? []

  const totalPages = Math.ceil(data?.paginate?.total! / (data?.paginate?.pageSize ?? 10))

  return (
    <>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>N° afiliado</TableHead>
          <TableHead>Nombre completo</TableHead>
          <TableHead>Fecha Nacimiento</TableHead>
          <TableHead>Documento</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {affiliates.map((affiliate) => {
          const normalizedDob = affiliate.date_of_birth
            .slice(0, 10)
            .replace(/-/g, "/");

          return (
            <TableRow key={affiliate.affiliate_number}>
              <TableCell>{affiliate.affiliate_number}</TableCell>
              <TableCell>
                <div className="flex gap-x-1 flex-row">
                  <span>
                    {affiliate.sex === "Woman" ? (
                      <Venus className="w-5 h-5" />
                    ) : (
                      <Mars className="w-5 h-5" />
                    )}
                  </span>
                  <span>{affiliate.name + " " + affiliate.last_name}</span>
                </div>
              </TableCell>
              <TableCell>{normalizedDob}</TableCell>
              <TableCell>{affiliate.dni}</TableCell>
              <TableCell>
                <AffiliateState state={affiliate.paid} />
              </TableCell>
              <TableCell className="flex gap-x-2">
                <Button variant="outline" size="icon">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Trash className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>

        <div className="mt-4">
          <PaginationBuilder page={page} totalPages={totalPages} setPage={setPage}/>
        </div>
    </>
  );
}
