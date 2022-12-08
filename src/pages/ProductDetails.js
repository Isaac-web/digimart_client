import React, { useEffect, useState } from "react";
import {
  Box,
  CardMedia,
  Container,
  Typography,
  Paper,
  Grid,
  useTheme,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  Toolbar,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { fetchProduct } from "../store/reducers/details/product";

const ProductDetails = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { data: product, loading } = useSelector(
    (state) => state.details.product
  );

  const closeDialog = (id) => {
    setDialogOpen(false);
  };

  const handleDelete = (id) => {
    closeDialog();
  };

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, []);

  if (loading) return null;
  // console.log(product);
  return (
    <Container sx={{ paddingBottom: "2em" }}>
      <Paper
        sx={(theme) => ({
          borderRadius: theme.rounded.medium,
          padding: "1.5em",
        })}
      >
        <Box>
          <Typography gutterBottom variant="h6" sx={{ fontWeight: "bold" }}>
            Product Details
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box>
              <CardMedia
                image={product?.image?.url}
                sx={(theme) => ({
                  width: "100%",
                  height: "25em",
                  backgroundColor: theme.palette.common.light,
                })}
              />
            </Box>
            <Box></Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography gutterBottom variant="subtitle2">
                {product.category.name}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                sx={{ fontWeight: "bold", fontSize: "1.8em" }}
              >
                {product.name}
              </Typography>
            </Box>
            <Box>
              <Typography gutterBottom variant="body2">
                {product.desc}
              </Typography>
            </Box>

            <Box>
              <Typography variant="h4" sx={{ fontWeight: "500" }}>
                Ghc {product.price.toFixed(2)}
              </Typography>
              <Typography gutterBottom variant="subtitle2">
                per {product.unit}
              </Typography>
            </Box>

            <Box sx={{ marginBottom: "0em" }}>
              <Typography gutterBottom variant="subtitle2">
                <Typography
                  sx={{ display: "inline", fontWeight: "bold" }}
                  variant="inherit"
                >
                  Status:
                </Typography>{" "}
                {product.status ? "Available" : "Unavailable"}
              </Typography>
            </Box>

            <Box sx={{ marginBottom: "5em" }}>
              <Typography gutterBottom variant="subtitle2">
                <Typography
                  sx={{ display: "inline", fontWeight: "bold" }}
                  variant="inherit"
                >
                  Pricing:
                </Typography>{" "}
                {product.priceFixed
                  ? "Fixed"
                  : `Starting at Ghc${product.price?.toFixed(2)}`}
              </Typography>
            </Box>

            <Box>
              <Grid container spacing={3}>
                <Grid item>
                  <Button
                    startIcon={<Edit />}
                    sx={{ width: 120 }}
                    variant="outlined"
                    onClick={() => navigate(`/products/edit/${productId}`)}
                  >
                    Edit
                  </Button>
                </Grid>
                <Grid item>
                  <Button sx={{ width: 120 }} endIcon={<Delete />}>
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Dialog open={dialogOpen}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">
            Are you sure you want to delete this product?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="outlined" onClick={closeDialog}>
            No
          </Button>
          <Button onClick={handleDelete}>Yes</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductDetails;
