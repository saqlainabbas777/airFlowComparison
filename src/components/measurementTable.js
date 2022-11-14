import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import {useState} from "react";


function MeasurementTable({rows, headDesc}) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <Paper sx={{maxWidth: '100%'}}>
            <TableContainer sx={{maxHeight: 440}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={6}>
                                {
                                    headDesc.countryName !== undefined && headDesc.cityName !== undefined ?
                                    `${headDesc.countryName}, ${headDesc.cityName}` : 'Measurement Table'
                                }
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Co ordinates</TableCell>
                            <TableCell align="center">Parameters</TableCell>
                            <TableCell align="center">Unit</TableCell>
                            <TableCell align="center">Value</TableCell>
                            <TableCell align="center">Last Updated</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        <TableCell component="th" scope="row">
                                            {`${row.coordinates.latitude}, ${row.coordinates.longitude}`}
                                        </TableCell>
                                        <TableCell align="center">{row.parameter}</TableCell>
                                        <TableCell align="center">{row.unit}</TableCell>
                                        <TableCell align="center">{row.value}</TableCell>
                                        <TableCell align="center">{row.lastUpdated}</TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default MeasurementTable;
