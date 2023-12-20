import { IconButton, Snackbar } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Add, Remove, RemoveShoppingCart } from '@mui/icons-material';
import { useState } from 'react';
import { CartResponse, useProduct } from '../../../service/product';

export interface CartTableProps {
  carts: CartResponse[];
  onDataChanged?: () => void;
}

export default function CartTable({ carts, onDataChanged }: CartTableProps) {
  const { addToCart, removeCart } = useProduct();
  const [successCartOpen, setSuccessCartOpen] = useState(false);
  const handleAddToCart = (id: number, quantity: number) => {
    addToCart(id, quantity).then(() => {
      setSuccessCartOpen(true);
      onDataChanged && onDataChanged();
    });
  };
  const handleRemoveCart = (id: number) => {
    removeCart(id).then(() => {
      onDataChanged && onDataChanged();
    });
  };
  const columns: GridColDef<CartResponse>[] = [
    {
      field: 'sku',
      headerName: 'SKU',
      valueGetter: (params: GridValueGetterParams<CartResponse>) =>
        `${params.row.product.sku}`,
    },
    {
      field: 'name',
      headerName: 'Cart Name',
      width: 130,
      valueGetter: (params: GridValueGetterParams<CartResponse>) =>
        `${params.row.product.name}`,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 160,
      valueGetter: (params: GridValueGetterParams<CartResponse>) =>
        `$${params.row.product.price}`,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 160,
      valueGetter: (params: GridValueGetterParams<CartResponse>) =>
        `${params.row.quantity}`,
    },
    {
      field: 'id',
      headerName: 'Action',
      width: 160,
      renderCell: (param) => (
        <>
          <IconButton
            onClick={() => handleAddToCart(param.row.product.id, 1)}
            aria-label="edit"
            size="small"
          >
            <Add />
          </IconButton>
          {param.row.quantity > 1 && (
            <IconButton
              onClick={() => handleAddToCart(param.row.product.id, -1)}
              aria-label="edit"
              size="small"
            >
              <Remove />
            </IconButton>
          )}
          <IconButton
            onClick={() => handleRemoveCart(param.row.product.id)}
            aria-label="edit"
            size="small"
          >
            <RemoveShoppingCart />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <Snackbar
        open={successCartOpen}
        autoHideDuration={5000}
        onClose={() => setSuccessCartOpen(false)}
        message="Add to cart success"
      />
      <DataGrid
        disableColumnSelector={true}
        disableRowSelectionOnClick={true}
        rows={carts}
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
