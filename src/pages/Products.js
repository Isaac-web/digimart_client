import React from "react";
import {
  Container,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  InputBase,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import SearchField from "../components/SearchField";

const Products = () => {
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

  const items = [
    {
      id: "1",
      title: "Product 1",
      category: "Category 1",
      price: 21,
      available: true,
    },
    {
      id: "2",
      title: "Product 2",
      category: "Category 1",
      price: 21,
      available: true,
    },
    {
      id: "3",
      title: "Product 3",
      category: "Category 1",
      price: 21,
      available: true,
    },
    {
      id: "4",
      title: "Product 6",
      category: "Category 1",
      price: 21,
      available: true,
    },
  ];
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
            <SearchField placeholder="Search Products..."/>
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow
                  key={item.id}
                  component={Link}
                  to={`/products/${item.id}`}
                  sx={{ textDecoration: "none" }}
                >
                  <TableCell>
                    <Box
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 10,
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                      }}
                    ></Box>
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>status</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Container>
  );
};

export default Products;
