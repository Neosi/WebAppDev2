import React from "react";
import { Table, Divider, Icon } from "antd";
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
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: (text, record) => (
      <span>
        <a>View</a>
        <Divider type="vertical" />
        <a>Delete</a>
        <Divider type="vertical" />
        <a className="ant-dropdown-link">
          More actions <Icon type="down" />
        </a>
      </span>
    )
  }
];

export class CharacterTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { characters: null, selectedRowKeys: [], hasData: false };
  }

  onSelectChange = selectedRowKeys => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  componentDidMount() {
    axios
      .get("http://127.0.0.1:5000/get-characters")
      .then(response => {
        this.setState({ characters: response.data, hasData: true });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true
    };
    return (
      <Table
        loading={!this.state.hasData}
        rowSelection={rowSelection}
        rowKey="id"
        dataSource={this.state.characters || null}
        columns={columns}
        expandedRowRender={record => (
          <div>
            Allignment: {record.allignment} 
            <Divider type="vertical" />
            Age: {record.age}
            <Divider type="vertical" />
            Background:{record.background}
            <Divider type="vertical" />
            Appearance: {record.appearance}
          </div>
        )}
      />
    );
  }
}
