import { Box, Button, CircularProgress, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ProductResponse, useProduct } from '../../service/product';
import { useEffect, useState } from 'react';
import ProductTable from './component/ProductTable';

export default function ProductPage() {
  const { loading, findAll } = useProduct();
  const [product, setProduct] = useState<ProductResponse[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const handleFindAll = async () => {
    findAll(page).then((data) => {
      setProduct(data.data.items);
      setTotalPage(data.data.totalPages);
    });
  };
  useEffect(() => {
    handleFindAll();
  }, []);
  useEffect(() => {
    handleFindAll();
  }, [page]);
  return (
    <Box>
      <Typography variant="h4">Product</Typography>
      <Link component={RouterLink} to={'/carts'}>
        <Button>Show Cart</Button>
      </Link>
      <ProductTable
        totalPage={totalPage}
        products={product}
        page={page}
        onPageChanged={setPage}
      />{' '}
      {loading && <CircularProgress />}
    </Box>
  );
}
