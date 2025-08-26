import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox"; // ✅ Import Checkbox
import { visuallyHidden } from "@mui/utils";
import { LoadingContext } from "../../context/LoadingContext";
import useVerifyAccess from "../../SharedData/verifyFunction";
import "./CampaignHistory.css";

function descendingComparator(a, b, orderBy) {
  if (orderBy === "Date") {
    return new Date(b[orderBy]) - new Date(a[orderBy]);
  }
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// ✅ Added "Complete" column
const headCells = [
  { id: "orgName", label: "Organizer Name" },
  { id: "orgTele", label: "Organizer Telephone" },
  { id: "orgEmail", label: "Organizer Email" },
  { id: "Date", label: "Date" },
  { id: "District", label: "District" },
  { id: "A_plus", label: "A+" },
  { id: "B_plus", label: "B+" },
  { id: "O_plus", label: "O+" },
  { id: "AB_plus", label: "AB+" },
  { id: "A_minus", label: "A-" },
  { id: "B_minus", label: "B-" },
  { id: "O_minus", label: "O-" },
  { id: "AB_minus", label: "AB-" },
  { id: "complete", label: "Complete" } // ✅ Checkbox column
];

export default function CampaignHistory() {
  useVerifyAccess("campaignHistory");
  const [rows, setRows] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("Date");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { setLoading } = useContext(LoadingContext);

  React.useEffect(() => {
    try {
      const userId = localStorage.getItem("userId");
      fetch(`http://localhost:9191/dashboard/CampaignHistory?user_id=${userId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Server Error!");
          return res.json();
        })
        .then((data) => {
          setRows(
            data.map((campaign, index) => ({
              id: index,
              District: campaign.District,
              Date: campaign.Date,
              orgName: campaign.orgName,
              orgTele: campaign.orgTele,
              orgEmail: campaign.orgEmail,
              DonerCount: campaign.DonerCount,
              A_plus: campaign.A_plus,
              B_plus: campaign.B_plus,
              O_plus: campaign.O_plus,
              AB_plus: campaign.AB_plus,
              A_minus: campaign.A_minus,
              B_minus: campaign.B_minus,
              O_minus: campaign.O_minus,
              AB_minus: campaign.AB_minus,
              complete: false 
            }))
          );
        })
        .catch((err) => console.error("Error fetching campaign history:", err));
    } catch (error) {
      console.error("Error in CampaignHistory component:", error);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // ✅ Toggle checkbox value
  const handleCheckboxChange = (id) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, complete: !row.complete } : row
      )
    );
  };

  return (
    <div className="campaign-history">
      <p className="page-head-campHistory">History of all the campaigns </p>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={(e) => handleRequestSort(e, headCell.id)}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <span style={visuallyHidden}>
                          {order === "desc" ? "sorted descending" : "sorted ascending"}
                        </span>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice()
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover key={row.id}>
                    {headCells.map((cell) => (
                      <TableCell key={cell.id}>
                        {cell.id === "complete" ? (
                          <Checkbox
                            checked={row.complete}
                            onChange={() => handleCheckboxChange(row.id)}
                            color="primary"
                          />
                        ) : (
                          row[cell.id] ?? "-"
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
    </div>
  );
}
