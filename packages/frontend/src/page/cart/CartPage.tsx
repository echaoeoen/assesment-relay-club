import { Box, Button, CircularProgress, Typography, Link } from '@mui/material';
import CartTable from './component/CartTable';
import { CartResponse, useProduct } from '../../service/product';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

export default function CartPage() {
  const { loading, findAllCart } = useProduct();
  const [carts, setCarts] = useState<CartResponse[]>([]);
  const handleRefresh = () => {
    findAllCart().then((data) => {
      setCarts(data.data);
    });
  };
  useEffect(() => {
    handleRefresh();
  }, []);
  return (
    <Box>
      <Typography variant="h4">Cart</Typography>
      <Link component={RouterLink} to={'/checkout'}>
        <Button>Checkout</Button>
      </Link>
      <CartTable carts={carts} onDataChanged={handleRefresh} />
      {loading && <CircularProgress />}
    </Box>
  );
}
