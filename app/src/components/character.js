import React from "react";
import { Table } from "antd";
import axios from "axios";
export default { title: "Characters" };

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "Class",
    dataIndex: "character_class",
    key: "character_class"
  },
  {
    title: "Race",
    dataIndex: "race",
    key: "race"
  },
  {
    title: "Allignment",
    dataIndex: "allignment",
    key: "allignment"
  }
];

export class CharacterTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { characters: null };
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:5000/get-characters")
      .then(response => {
        console.log(response.data)
        this.setState({ characters: response.data });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <Table
        rowKey="id"
        dataSource={this.state.characters || null}
        columns={columns}
        expandedRowRender={record => (
          <p style={{ margin: 0 }}>Background:{record.background} Appearance: {record.appearance}</p>
        )}
      />
    );
  }
}
