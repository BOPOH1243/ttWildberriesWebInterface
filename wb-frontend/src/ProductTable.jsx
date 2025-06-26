import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  TableSortLabel, Paper, CircularProgress
} from '@mui/material';

export default function ProductTable({ data, loading }) {
  const columns = useMemo(() => [
    { accessorKey: 'name', header: 'Название' },
    { accessorKey: 'price', header: 'Цена' },
    { accessorKey: 'sale_price', header: 'Цена со скидкой' },
    { accessorKey: 'rating', header: 'Рейтинг' },
    { accessorKey: 'feedbacks', header: 'Отзывы' },
  ], []);

  const table = useReactTable({
    data,
    columns,
    state: {},
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (loading) return <CircularProgress />;

  return (
    <Paper>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableCell key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : <TableSortLabel
                        {...{
                          active: header.column.getIsSorted(),
                          direction: header.column.getIsSorted() || undefined,
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {header.column.columnDef.header}
                      </TableSortLabel>}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {cell.getValue?.()}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
