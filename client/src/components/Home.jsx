import React, { useEffect, useState } from "react";
import axios from 'axios'
import styled from "styled-components";
import {TD, TH, THead, TR, Table} from './homeStyles'
const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #bf4f74;
  border-radius: 3px;
`;



export const Home = () => {
  const [usersData, setUsersData] = useState([])

  const fetchData = async () => {
    const {data} = await axios.get('https://jsonplaceholder.typicode.com/users')
    setUsersData(data)
  }

  useEffect(()=>{
    
    fetchData()
  },[])
  return (
    <div>
      <Button>Add User</Button>
      <Table>
        <THead>
          <TR>
            <TH>ID</TH>
            <TH>First Name</TH>
            <TH>Last Name</TH>
            <TH>Email</TH>
            <TH>Organization</TH>
            <TH>Contact Number</TH>
            <TH>Action</TH>
          </TR>
        </THead>
        <tbody>
          {usersData && usersData.map((row) => (
            <TR key={row.id}>
              <TD>{row.id}</TD>
              <TD>{row.name}</TD>
              <TD>{row.username}</TD>
              <TD>{row.email}</TD>
              <TD>{row.website}</TD>
              <TD>{row.phone}</TD>
              <TD>
                <Button>Edit</Button>
                <Button>Delete</Button>
              </TD>
            </TR>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
