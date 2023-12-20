import {
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Typography,
} from '@mui/material';
import CheckoutTable from './component/CheckoutTable';
import { CheckoutResponse, useProduct } from '../../service/product';
import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const { loading, checkout } = useProduct();
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [checkouts, setCheckouts] = useState<CheckoutResponse[]>([]);
  const handleRefresh = () => {
    checkout().then((data) => {
      setCheckouts(data.data);
    });
  };
  useEffect(() => {
    handleRefresh();
  }, []);
  return (
    <Box>
      <Typography variant="h4">Checkout</Typography>
      <Button onClick={() => setPaymentOpen(true)}>Process Payment</Button>
      <CheckoutTable checkouts={checkouts} onDataChanged={handleRefresh} />
      {loading && <CircularProgress />}
      <Snackbar
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        message="payment not implemented"
      ></Snackbar>
    </Box>
  );
}
