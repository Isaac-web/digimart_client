import React, { useEffect, useRef, useState } from "react";
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
import AppProgress from "../components/AppProgress";
import Empty from "../Empty";
import SearchField from "../components/SearchField";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";

import { productTableColumns, items } from "../data/products";
import {
  clearSearch,
  loadProducts,
  searchProducts,
} from "../store/reducers/entities/products";

const Products = () => {
  const [searchString, setSearchString] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const {
    data: products,
    loading,
    searchResults,
    searching,
  } = useSelector((state) => state.entities.products);
  console.log(searching);

  const mapToViewModel = (data) => {
    return data?.map((p) => ({
      _id: p._id,
      name: p.name,
      image: p?.image,
      category: p.category.name,
      price: `Ghc ${p.price.toFixed(2)}`,
      imageUri: p?.imageUri,
      status: p?.status,
    }));
  };

  useEffect(() => {
    dispatch(loadProducts());

    return () => {
      dispatch(clearSearch());
    };
  }, []);

  const handleRowSelect = (item) => {
    navigate(`/products/${item._id}`);
  };

  const handleSearch = (value, key) => {
    setSearchString(value);
    if (key === "Enter") {
      dispatch(searchProducts(value));
    }
  };

  if (loading)
    return (
      <AppProgress
        title="Loading"
        subtitle="Please wait while we fetch the products..."
      />
    );

  return products?.length ? (
    <Container sx={{ paddingBottom: "2em" }}>
      <Box>
        <Typography fontWeight={"semibold"} variant="h4">
          Products
        </Typography>
        <Typography variant="subtitle1">
          There are currently {products?.length} products in the database.
        </Typography>
      </Box>

      <Box sx={{ padding: "1em 0em" }}>
        <Grid container alignItems={"center"} justifyContent={"space-around"}>
          <Grid item xs={12} md={10}>
            <SearchField
              placeholder="Search Products..."
              onClear={() => dispatch(clearSearch())}
              onChange={handleSearch}
              loading={searching}
            />
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
            data={
              searchResults.length
                ? mapToViewModel(searchResults)
                : mapToViewModel(products)
            }
            onRowSelect={handleRowSelect}
          />
        </Box>
      </Paper>
    </Container>
  ) : (
    <Container>
      <Empty CustomComponent={<NoProductComponent />} />
    </Container>
  );
};

const NoProductComponent = () => {
  return (
    <Box sx={{ padding: "3em" }}>
      <Grid
        container
        direction="column"
        justifyContent={"center"}
        alignItems="center"
      >
        <Grid item>
          <Typography sx={{ fontWeight: "bold" }} variant="h5">
            Nothing yet
          </Typography>
        </Grid>
        <Grid item>
          <Typography>No product has been added yet</Typography>
        </Grid>
        <Grid item>
          <Button component={Link} to="/products/new" variant="text">
            Click here to add one
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Products;
