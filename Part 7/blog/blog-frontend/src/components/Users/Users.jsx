// n.b. I am not AT ALL happy about the way in which I handled getting the list of
// unique users and their individual number of blogs, but the solution I came up
// with appears to work - and frankly I am not sure this is the time or place to be
// pedantic about DSA.

import React from "react";
import has from "lodash";
import { Link } from "react-router-dom";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const Users = ({ blogs }) => {
  console.log(blogs);

  // Sort blogs by author name
  const sortedArrays = has.orderBy(blogs, ["author"], ["asc"]);

  // Use a Map to store author -> user ID mapping and count blogs per author
  const userMap = new Map();
  sortedArrays.forEach((item) => {
    if (!userMap.has(item.author)) {
      userMap.set(item.author, { id: item.user.id, count: 1 });
    } else {
      userMap.get(item.author).count += 1;
    }
  });

  // Convert userMap to an array
  const userArray = Array.from(userMap, ([author, { id, count }]) => ({
    author,
    id,
    count,
  }));

  console.log("userArray: ", userArray);

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "#fff", fontSize: "24px" }} align="center">
              User
            </TableCell>
            <TableCell sx={{ color: "#fff", fontSize: "24px" }} align="right">
              # of Blogs
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userArray.map((user) => (
            <TableRow key={`${user.id}-${user.author}`}>
              <TableCell sx={{ color: "#fff" }} align="center">
                <Link
                  to={`/users/${user.id}`}
                  style={{ color: "lightGreen", textDecoration: "none" }}
                >
                  {user.author}
                </Link>
              </TableCell>
              <TableCell align="right" sx={{ color: "#fff" }}>
                {user.count}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Users;
