import React from "react";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import _ from "lodash";

const AppTable = ({ columns, data }) => {
  const renderCell = (item, column) => {
    if (column.render) return column.render;

    return _.get(item, column.dataIndex);
  };
  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((c) => (
              <TableCell>{c.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((item) => (
            <TableRow>
              {columns.map((c) => (
                <TableCell>{renderCell(item, c)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default AppTable;
