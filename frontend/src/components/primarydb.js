import React, { Component } from "react";
import "../App.css";
import Progressbar from "./progress_bar";

var finalUsers = [];
//var finalUsers1 = [];

class Table1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      users1: [],
      Users3: [],
      table: [],
      isLoading: false,
      isError: false,
      percentage: [],
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const response = await fetch("http://localhost:3001/primary"); //primary database
    //console.log(response);
    const response1 = await fetch("http://localhost:3002/secondary"); //secondary database
    if (response.ok) {
      const users = await response.json();
      // console.log(users);
      const users1 = await response1.json();
      //console.log(users1);
      this.setState({ users, users1, isLoading: false });
    } else {
      this.setState({ isError: true, isLoading: false });
    }
  }

  render() {
    const { users, users1, isLoading, isError } = this.state;

    // console.log("users1", users1);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isError) {
      return <div>Error</div>;
    }

    /* let userTables = users1.map((user) => {
                             return {
                                 table_name: user.table_name
                             }
                         })*/

    // let userRowCounts = users1.map((user) => {
    //     return {
    //         row_count: user.row_count
    //     }
    // })

    // console.log(userRowCounts);

    // finalUsers = [...users]

    //let finalUsers = []

    let table = [];

    // let table1 = [];

    for (var i = 0; i < users.length; i++) {
      //table1=users;
      for (var j = 0; j < users1.length; j++) {
        if (users[i].table_name === users1[j].table_name) {
          //second database data
          table = [...table, { ...users[i], rowCount2: users1[j].row_count }];
        }
      }
    }

    //console.log(table);

    finalUsers = table;
    //finalUsers1 = table1;

    return finalUsers.length > 0 ? (
      <table>
        <thead>
          <tr>{this.renderTableHeader()}</tr>
        </thead>
        <tbody>{this.renderTableRows()}</tbody>
      </table>
    ) : (
      <div>No users.</div>
    );
  }

  renderTableHeader = () => {
    // return Object.keys(finalUsers[0]).map((attr) => (
    // <th key={attr}>{attr.toUpperCase()}</th>
    return (
      <>
        <th>Table Name</th> <th>Row count1</th>
        <th>Row count2</th> <th>Percentage</th>
        <th>progress Bar</th>
      </>
    );
    // ));
  };
  renderTableRows = () => {
    return (
      <>
        {finalUsers.map((user) => {
          var percentage = (user.rowCount2 / user.row_count) * 100;

          // console.log("per", percentage);
          return (
            <tr key={user.table_name}>
              <td>{user.table_name}</td>
              <td>{user.row_count}</td>
              <td>{user.rowCount2}</td>
              <td>{Math.round(percentage)}</td>
              <td>
                <Progressbar
                  bgcolor="blue"
                  progress={Math.round(percentage)}
                  height={10}
                />
              </td>
            </tr>
          );
        })}
        {/*}    {finalUsers1.map((user) => {
          return (
            <tr key={user.table_name}>
              <td>{user.table_name}</td>

            </tr>
          );
        })}*/}
      </>
    );
  };
}

export default Table1;
