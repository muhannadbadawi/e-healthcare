import { Table, TableHead, TableRow, TableCell, Skeleton, TableBody } from "@mui/material";

const TableSkeleton = () => {
    return(
        <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>
              <Skeleton width={150} />
            </TableCell>
            <TableCell>
              <Skeleton width={100} />
            </TableCell>
            <TableCell>
              <Skeleton width={150} />
            </TableCell>
            <TableCell>
              <Skeleton width={100} />
            </TableCell>
            <TableCell align="center">
              <Skeleton width={100} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton width={200} />
                </TableCell>
                <TableCell>
                  <Skeleton width={120} />
                </TableCell>
                <TableCell>
                  <Skeleton width={180} />
                </TableCell>
                <TableCell>
                  <Skeleton width={80} />
                </TableCell>
                <TableCell align="center">
                  <Skeleton width={80} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    )
}
export default TableSkeleton;