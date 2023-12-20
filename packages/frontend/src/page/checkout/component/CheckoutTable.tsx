import { IconButton, Snackbar, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useState } from 'react';
import { CheckoutResponse, useProduct } from '../../../service/product';

export interface CheckoutTableProps {
  checkouts: CheckoutResponse[];
  onDataChanged?: () => void;
}

export default function CheckoutTable({
  checkouts,
  onDataChanged,
}: CheckoutTableProps) {
  const [successCheckoutOpen, setSuccessCheckoutOpen] = useState(false);
  const columns: GridColDef<CheckoutResponse>[] = [
    {
      field: 'sku',
      headerName: 'SKU',
      valueGetter: (params) => `${params.row.product.sku}`,
    },
    {
      field: 'name',
      headerName: 'Checkout Name',
      width: 600,
      renderCell: (params) => (
        <div>
          <Typography>{params.row.product.name}</Typography>
          {params.row.discountDescription && (
            <div>
              <Typography color={'chocolate'} variant="subtitle1">
                {params.row.discountDescription}
              </Typography>
            </div>
          )}
        </div>
      ),
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 160,
      valueGetter: (params) => `$${params.row.product.price}`,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 160,
      valueGetter: (params) => `${params.row.quantity}`,
    },
    {
      field: 'totalPrice',
      headerName: 'Total Price',
      width: 160,
      valueGetter: (params) => `$${params.row.price}`,
    },
  ];

  return (
    <>
      <Snackbar
        open={successCheckoutOpen}
        autoHideDuration={5000}
        onClose={() => setSuccessCheckoutOpen(false)}
        message="Add to Checkout success"
      />
      <DataGrid
        disableColumnSelector={true}
        disableRowSelectionOnClick={true}
        rows={checkouts.map((checkout, index) => ({ ...checkout, id: index }))}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 1, pageSize: 100 },
          },
        }}
        pageSizeOptions={[100]}
        checkboxSelection
      />
    </>
  );
}
