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

const AppTable = ({ columns, data, onRowSelect }) => {
  const renderCell = (item, column) => {
    if (column.render) return column.render(item);

    return _.get(item, column.dataIndex);
  };


  const raiseRowSelect = (item) => {
    if (typeof onRowSelect === "function") onRowSelect(item);
  }

  return (
    <Box sx={{ overflow: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((c) => (
              <TableCell align={c?.align} key={c.id}>
                {c.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.map((item) => (
            <TableRow key={item?.id || item?._id} onClick={raiseRowSelect}>
              {columns.map((c) => (
                <TableCell
                  align={c?.align}
                  key={c.dataIndex + (item.id || item._id)}
                >
                  {renderCell(item, c)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default AppTable;
