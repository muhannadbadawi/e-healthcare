import { useEffect, useState } from "react";
import { getHistory } from "../../../api/userService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

interface ChatHistory {
  clientName: string;
  doctorName: string;
  createdAt: string;
  endAt: string;
}

const DoctorHistory = () => {
  const [history, setHistory] = useState<ChatHistory[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistory();

        // ✅ Ensure it's always an array
        const formatted = Array.isArray(data) ? data : [data];

        setHistory(formatted);
      } catch (error) {
        console.error("Failed to fetch chat history", error);
      }
    };
    fetchHistory();
  }, []);

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ m: 2 }}>
        Chat History
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Client Name</TableCell>
            <TableCell>Doctor Name</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((chat, index) => (
            <TableRow key={index}>
              <TableCell>{chat.clientName}</TableCell>
              <TableCell>{chat.doctorName}</TableCell>
              <TableCell>{new Date(chat.createdAt).toLocaleString()}</TableCell>
              <TableCell>{new Date(chat.endAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DoctorHistory;
