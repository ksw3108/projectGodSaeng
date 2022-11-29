import Pagination from '@material-ui/lab/Pagination';
import { Typography } from '@mui/material/';
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@material-ui/core';
import PaginationItem from '@material-ui/lab/PaginationItem';
//컴포넌트 라이브러리로 작업해보려고 만든 공용 페이징처리되는 테이블 컨테이너(미완)
const PagedTable = () => {
  return (
    <TableContainer>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">1</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">2</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>cell</TableCell>
            <TableCell align="left">etet</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default PagedTable;
