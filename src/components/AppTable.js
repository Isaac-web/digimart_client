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
} from "@mui/material";
import _ from "lodash";

const AppTable = ({
  columns,
  data,
  onRowSelect,
  rowKey,
  count,
  rowsPerPage,
  page,
  onPageChange,
}) => {
  const renderCell = (item, column) => {
    if (column.render) return column.render(item);

    return _.get(item, column.dataIndex);
  };

  const raiseRowSelect = (item) => {
    if (typeof onRowSelect === "function") onRowSelect(item);
  };

  const raiseChangePage = (e, newPage) => {
    const page = parseInt(newPage);
    const direction = newPage < 0 ? "prev" : "next";

    if (onPageChange) onPageChange(page, direction);
  };

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

        <TableBody>
          {data?.map((item) => (
            <TableRow key={item[rowKey]} onClick={() => raiseRowSelect(item)}>
              {columns.map((c, index) => (
                <TableCell align={c?.align} key={c.dataIndex + index}>
                  {renderCell(item, c)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TablePagination
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={raiseChangePage}
          />
        </TableFooter>
      </Table>
    </Box>
  );
};

export default AppTable;
