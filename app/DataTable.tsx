"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";

// Props für die generische DataTable-Komponente
interface DataTableProps<T> {
  data: T[]; // Array mit Datenelementen
  columns: { header: string; accessor: keyof T }[]; // Spalten-Definition (Header + Dateneigenschaften)
  onDelete?: (item: T) => void; // Optional: Callback für Löschen-Aktion
  onEdit?: (item: T) => void; // Optional: Callback für Bearbeiten-Aktion
}

// Generische, wiederverwendbare Datentabelle mit dynamischen Spalten und Aktionen (Bearbeiten/Löschen)
export default function DataTable<T>({
  data,
  columns,
  onDelete,
  onEdit,
}: DataTableProps<T>) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={String(col.accessor)}>
                {col.header}
              </TableHead>
            ))}
            {(onEdit || onDelete) && (
              <TableHead className="w-15 text-right">
                Aktionen
              </TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            // Rendert jedes Datenelement als Tabellenzeile mit dynamischen Spalten
            data.map((item, idx) => (
              <TableRow key={idx}>
                {columns.map((col) => (
                  <TableCell key={String(col.accessor)}>
                    {String(item[col.accessor] ?? "")}
                  </TableCell>
                ))}

                {(onEdit || onDelete) && (
                  <TableCell className="text-right">
                    {/* Dropdown-Menü für Zeilen-Aktionen (Bearbeiten / Löschen) */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        {onEdit && (
                          <DropdownMenuItem
                            onClick={() => onEdit(item)}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Bearbeiten
                          </DropdownMenuItem>
                        )}

                        {onDelete && (
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => onDelete(item)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Löschen
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + 1}
                className="h-24 text-center text-muted-foreground"
              >
                Keine Einträge gefunden.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
