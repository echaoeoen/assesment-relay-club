import { IconButton, Snackbar, SnackbarContent } from '@mui/material';
import { ProductResponse, useProduct } from '../../../service/product';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { AddShoppingCart } from '@mui/icons-material';
import { useState } from 'react';

export interface ProductTableProps {
  products: ProductResponse[];
  page: number;
  totalPage: number;
  onPageChanged: (page: number) => void;
}

export default function ProductTable({ products, page }: ProductTableProps) {
  const { addToCart } = useProduct();
  const [successCartOpen, setSuccessCartOpen] = useState(false);
  const handleAddToCart = (id: number) => {
    addToCart(id, 1).then(() => {
      setSuccessCartOpen(true);
    });
  };
  const columns: GridColDef<ProductResponse>[] = [
    { field: 'sku', headerName: 'SKU' },
    { field: 'name', headerName: 'Product Name', width: 130 },
    {
      field: 'price',
      headerName: 'Price',
      width: 160,
      valueGetter: (params: GridValueGetterParams<ProductResponse>) =>
        `$${params.row.price}`,
    },
    {
      field: 'id',
      headerName: 'Action',
      width: 160,
      renderCell: (param) => (
        <>
          <IconButton
            onClick={() => handleAddToCart(param.row.id)}
            aria-label="edit"
            size="small"
          >
            <AddShoppingCart />
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
        rows={products}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: page, pageSize: 100 },
          },
        }}
        paginationMode="server"
        pageSizeOptions={[100]}
        checkboxSelection
      />
    </>
  );
}
