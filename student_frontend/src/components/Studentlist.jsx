import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../axiosInterceptor";


const Studentlist = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 7;

  useEffect(() => {
    axiosInstance
      .get("http://localhost:3000/students")
      .then((response) => {
        console.log(response.data);
        setData(response.data.students);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event, value) => {
    setPage(value);

  };

  const handleDelete = (id) => {
    axiosInstance
      .delete(`http://localhost:3000/students/${id}`)
      .then((response) => {
        console.log(response.data);
        setData((prevData) =>
          prevData.filter((student) => student._id !== id)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (

    <div
      style={{
        minHeight: "70vh",
        width: "100%",
        background:
          "linear-gradient(135deg,#ede7f6,#d1c4e9,#b39ddb)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px"
      }}
    >

      <TableContainer
        component={Paper}
        sx={{
          width: "90%",
          maxWidth: "1100px"
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#673ab7"
              }}
            >
              <TableCell sx={{ color: "white" }}>
                Reg No
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                Candidate Name
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                Course
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                Email
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                Marks
              </TableCell>
              <TableCell sx={{ color: "white" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data
                .slice(
                  (page - 1) * rowsPerPage,
                  page * rowsPerPage
                )
                .map((student) => (
                  <TableRow
                    key={student._id}
                  >
                    <TableCell>
                      {student.regNo}
                    </TableCell>
                    <TableCell>
                      {student.candidateName}
                    </TableCell>
                    <TableCell>
                      {student.course}
                    </TableCell>
                    <TableCell>
                      {student.email}
                    </TableCell>
                    <TableCell>
                      {student.marks}
                    </TableCell>
                    <TableCell>
                      <Stack
                        direction="row"
                        spacing={1}
                      >
                        <Link to={`/update/${student._id}`}>
                          <Button
                            variant="contained"
                            size="small"
                            sx={{
                              backgroundColor: "#673ab7"
                            }}
                          >
                            Edit
                          </Button>
                        </Link>

                        <Button
                          variant="outlined"
                          size="small"
                          sx={{
                            color: "#673ab7",
                            borderColor: "#673ab7"
                          }}
                          onClick={() => handleDelete(student._id)}
                        >
                          Delete
                        </Button>
                        <Link></Link>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        sx={{
          mt: 3
        }}

        count={
          Math.ceil(data.length / rowsPerPage)
        }
        page={page}
        onChange={handleChange}
        color="primary"
      />
    </div>
  );

};

export default Studentlist;