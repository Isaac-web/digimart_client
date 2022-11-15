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
  console.log(product);

  return (
    <Container sx={{ paddingBottom: "2em" }}>
      <Paper sx={(theme) => ({ borderRadius: theme.rounded.medium })}>
        <Box
          sx={{
            height: "15em",
            // background: "darkred",
            padding: "3em",
            paddingBottom: "1em",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <CardMedia
                image={"none"}
                sx={{
                  height: "15em",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  borderRadius: 2,
                }}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid
                container
                direction="column"
                sx={{
                  height: "15em",
                  padding: "0 2em",
                  color: theme.palette.common.black,
                }}
                justifyContent="flex-end"
              >
                <Grid item>
                  <Typography variant="body1">
                    {product?.category?.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h4">{product?.name}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">
                    {"Last Updated: -, Created At: -"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Grid container>
            {/* This Grid is for alignment */}
            <Grid item xs={12} md={3}></Grid>

            <Grid item xs={12} md={9}>
              <Grid sx={{ padding: "4em", paddingTop: "2em" }}>
                <Grid container direction="column">
                  <Grid item>
                    <Grid container direction="row" alignItems={"flex-end"}>
                      <Grid item>
                        <Typography variant="h1">20</Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="h5"
                          sx={{ paddingBottom: "0.7em", margin: "0 10px" }}
                        >
                          Orders made
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Typography variant="h5">Description</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">{product.desc}</Typography>
                  </Grid>

                  <Grid item sx={{ padding: "1em 0", paddingBottom: "0.5em" }}>
                    <Typography variant="h6">
                      Price Per Unit:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        Ghc{product?.price?.toFixed(2)}
                      </span>
                    </Typography>
                  </Grid>

                  <Grid item sx={{ paddingBottom: "1em 0" }}>
                    <Typography variant="body1">
                      Measures In:{" "}
                      <span style={{ fontWeight: "bold" }}>Kg</span>
                    </Typography>
                  </Grid>

                  <Grid item sx={{ paddingBottom: "1em 0" }}>
                    <Typography variant="body1">
                      Status:{" "}
                      <span style={{ fontWeight: "bold", color: "green" }}>
                        Available
                      </span>
                    </Typography>
                  </Grid>
                </Grid>

                <Box sx={{ marginTop: 10 }}>
                  <Toolbar>
                    <Grid container justifyContent="flex-end" spacing={2}>
                      <Grid item>
                        <Button
                          onClick={() => navigate(`/products/edit/${productId}`)}
                          startIcon={<Edit />}
                          variant="outlined"
                        >
                          Edit
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          endIcon={<Delete />}
                          onClick={() => setDialogOpen(true)}
                        >
                          Delete
                        </Button>
                      </Grid>
                    </Grid>
                  </Toolbar>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
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
