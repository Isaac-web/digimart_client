import React from "react";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
  Grid,
  Typography,
} from "@mui/material";
import _ from "lodash";
import AppPorgress from "../components/AppProgress";

const AppTable = ({
  columns,
  data,
  onRowSelect,
  rowKey,
  count,
  rowsPerPage,
  page,
  onPageChange,
  showFooter,
  loading,
  empty,
}) => {
  const renderCell = (item, column) => {
    if (column.render) return column.render(item);

    return _.get(item, column.dataIndex);
  };

  const raiseRowSelect = (item) => {
    if (typeof onRowSelect === "function") onRowSelect(item);
  };

  const raiseChangePage = (e, newPage) => {
    if (onPageChange) onPageChange(newPage);
  };

  if (empty)
    return (
      <Box>
        <Typography align="center" fontWeight={"semibold"} variant="subtitle2">
          Looks like there is not results for your search.
        </Typography>
      </Box>
    );

  return (
    <Box sx={{ overflow: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((c, index) => (
              <TableCell align={c?.align} key={index.toString()}>
                {c.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {loading ? (
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <AppPorgress title="" size={"1.2em"} />
            </Grid>
          </Grid>
        ) : (
          <TableBody>
            {data?.map((item, rowIndex) => (
              <TableRow
                key={rowIndex.toString() + item[rowKey]}
                onClick={() => raiseRowSelect(item)}
              >
                {columns.map((c, index) => (
                  <TableCell align={c?.align} key={c.dataIndex + index}>
                    {renderCell(item, c)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        )}
        {showFooter && (
          <TableFooter>
            <TablePagination
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              rowsPerPageOptions={[25]}
              onPageChange={raiseChangePage}
              onRowsPerPageChange={onPageChange}
            />
          </TableFooter>
        )}
      </Table>
    </Box>
  );
};

export default AppTable;
