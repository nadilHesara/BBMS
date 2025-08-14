import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";

// ---------- data helpers ----------
function createData(
  id,
  orgName,
  contact,
  place,
  date, // YYYY-MM-DD for correct sorting
  A_pos, A_neg, B_pos, B_neg, AB_pos, AB_neg, O_pos, O_neg
) {
  const donations =
    A_pos + A_neg + B_pos + B_neg + AB_pos + AB_neg + O_pos + O_neg;
  return {
    id,
    orgName,
    contact,
    place,
    date,
    donations,
    A_pos,
    A_neg,
    B_pos,
    B_neg,
    AB_pos,
    AB_neg,
    O_pos,
    O_neg,
  };
}

const rows = [
  createData(1, "Red Heart Foundation", "077-1234567", "Colombo", "2025-07-15", 12, 3, 10, 2, 4, 1, 18, 6),
  createData(2, "Lions Club South", "071-5558899", "Galle", "2025-06-28", 8, 2, 7, 1, 3, 0, 12, 5),
  createData(3, "Hope Alliance", "070-8881122", "Matara", "2025-03-12", 10, 3, 8, 1, 2, 1, 14, 7),
  createData(4, "Youth for Life", "072-4455667", "Negombo", "2025-01-25", 11, 2, 8, 2, 3, 1, 16, 5),
  createData(5, "City General Hospital", "011-2345678", "Colombo", "2025-02-20", 7, 2, 9, 1, 2, 0, 11, 3),
  createData(6, "Rotary North", "075-2223344", "Kandy", "2025-05-30", 9, 1, 6, 2, 2, 1, 15, 4),
  createData(7, "Community Care", "078-9060708", "Jaffna", "2025-04-10", 6, 1, 5, 1, 1, 0, 9, 3),
];

// ---------- sorting helpers ----------
function descendingComparator(a, b, orderBy) {
  let valA = a[orderBy];
  let valB = b[orderBy];

  if (orderBy === "date") {
    valA = new Date(a.date);
    valB = new Date(b.date);
    if (valB < valA) return -1;
    if (valB > valA) return 1;
    return 0;
  }

  if (typeof valA === "string" && typeof valB === "string") {
    return valB.localeCompare(valA);
  }

  if (valB < valA) return -1;
  if (valB > valA) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// ---------- headers ----------
const mainHeadCells = [
  { id: "orgName", label: "Name of the Organization", numeric: false, disablePadding: true },
  { id: "contact", label: "Contact Number", numeric: false, disablePadding: false },
  { id: "place", label: "Place", numeric: false, disablePadding: false },
  { id: "date", label: "Date", numeric: false, disablePadding: false },
  { id: "donations", label: "Number of donations", numeric: true, disablePadding: false },
];

const bloodGroupCells = [
  { id: "A_pos", label: "A+" },
  { id: "A_neg", label: "A−" },
  { id: "B_pos", label: "B+" },
  { id: "B_neg", label: "B−" },
  { id: "AB_pos", label: "AB+" },
  { id: "AB_neg", label: "AB−" },
  { id: "O_pos", label: "O+" },
  { id: "O_neg", label: "O−" },
];

// ---------- head component ----------
function EnhancedTableHead({ order, orderBy, onRequestSort }) {
  const createSortHandler = (property) => (event) => onRequestSort(event, property);

  return (
    <TableHead>
      {/* Row 1: main columns + grouped header */}
      <TableRow>
        {mainHeadCells.map((cell) => (
          <TableCell
            key={cell.id}
            rowSpan={2}
            align={cell.numeric ? "right" : "left"}
            padding={cell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === cell.id ? order : false}
            sx={{ pl: cell.disablePadding ? 2 : undefined }}
          >
            <TableSortLabel
              active={orderBy === cell.id}
              direction={orderBy === cell.id ? order : "asc"}
              onClick={createSortHandler(cell.id)}
            >
              {cell.label}
              {orderBy === cell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center" colSpan={8}>
          Blood Group
        </TableCell>
      </TableRow>

      {/* Row 2: eight blood groups */}
      <TableRow>
        {bloodGroupCells.map((cell) => (
          <TableCell
            key={cell.id}
            align="right"
            sortDirection={orderBy === cell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === cell.id}
              direction={orderBy === cell.id ? order : "asc"}
              onClick={createSortHandler(cell.id)}
            >
              {cell.label}
              {orderBy === cell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

// ---------- toolbar with left-aligned Dense switch ----------
function EnhancedTableToolbar({ dense, onToggleDense }) {
  return (
    <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
      <Typography variant="h6" id="tableTitle" component="div" sx={{ flexGrow: 1 }}>
        Campaign History
      </Typography>

      {/* Right upper corner */}
      <FormControlLabel
        control={<Switch checked={dense} onChange={onToggleDense} size="small" />}
        label="Dense padding"
        sx={{ m: 0 }}
      />
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  dense: PropTypes.bool.isRequired,
  onToggleDense: PropTypes.func.isRequired,
};

// ---------- main component ----------
export default function CampaignHistory() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("date");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage]
  );

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          dense={dense}
          onToggleDense={(e) => setDense(e.target.checked)}
        />

        <TableContainer>
          <Table
            sx={{ minWidth: 1200 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell component="th" scope="row" padding="none" sx={{ pl: 2 }}>
                    {row.orgName}
                  </TableCell>
                  <TableCell>{row.contact}</TableCell>
                  <TableCell>{row.place}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell align="right">{row.donations}</TableCell>

                  <TableCell align="right">{row.A_pos}</TableCell>
                  <TableCell align="right">{row.A_neg}</TableCell>
                  <TableCell align="right">{row.B_pos}</TableCell>
                  <TableCell align="right">{row.B_neg}</TableCell>
                  <TableCell align="right">{row.AB_pos}</TableCell>
                  <TableCell align="right">{row.AB_neg}</TableCell>
                  <TableCell align="right">{row.O_pos}</TableCell>
                  <TableCell align="right">{row.O_neg}</TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={13} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
