import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AppTable from "../components/AppTable";
import SearchField from "../components/SearchField";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";

import { productTableColumns, items } from "../data/products";
import { loadProducts } from "../store/reducers/entities/products";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const { data: products } = useSelector((state) => state.entities.products);

  const mapToViewModel = (data) => {
    return data?.map((p) => ({
      _id: p._id,
      name: p.name,
      category: p.category.name,
      price: p.price,
    }));
  };

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  const handleRowSelect = (item) => {
    navigate(`/products/${item._id}`);
  };

  return (
    <Container>
      <Box>
        <Typography fontWeight={"semibold"} variant="h4">
          Products
        </Typography>
        <Typography variant="subtitle1">
          There are currently a number of products in the database.
        </Typography>
      </Box>

      <Box sx={{ padding: "1em 0em" }}>
        <Grid container alignItems={"center"} justifyContent={"space-around"}>
          <Grid item xs={12} md={10}>
            <SearchField placeholder="Search Products..." />
          </Grid>
          <Grid
            item
            md={2}
            sx={{
              paddingLeft: matchesMD ? 0 : 1,
              marginTop: matchesMD ? 1 : 0,
            }}
            xs={12}
          >
            <Button
              fullWidth
              component={Link}
              size="large"
              startIcon={<Add />}
              to="/products/new"
              variant="contained"
            >
              Add Product
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Paper
        sx={(theme) => ({ padding: 3, borderRadius: theme.rounded.medium })}
        variant="outlined"
      >
        <Box>
          <AppTable
            rowKey={"_id"}
            columns={productTableColumns}
            data={mapToViewModel(products)}
            onRowSelect={handleRowSelect}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default Products;
