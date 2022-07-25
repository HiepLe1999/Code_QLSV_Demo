import { Button, Space, Table, Input } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import React, { useEffect, useRef, useState } from "react";
import { ModalRefAttribute } from "../../common/types/ModalType";
import { StudentModal } from "./StudentModal";


interface Student {
  id: number;
  name: string;
  age: number;
  address: string;
  gender: string;
}

const { Search } = Input;

export const ListStudent: React.FC = () => {
  const columns: ColumnsType<Student> = [
    {
      title: "Mã",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "sex",
      filters: [
        { text: "Male", value: "male" },
        { text: "Female", value: "female" },
        { text: "Other", value: "other" },
      ],
      onFilter: (value: any, record) => record.gender.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handle_Edit(record)}>
            Edit
          </Button>
          <Button type="dashed" onClick={() => handle_Delete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const data: Student[] = [];

  const modalRef = useRef<ModalRefAttribute>(); // use ref to open modal.
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const datast: any = localStorage.getItem("student_list");
    console.log(datast);

    if (datast !== null) setStudents(JSON.parse(datast));
  }, []);

  // Add
  const openModal = async () => {
    const result = await modalRef!.current!.show();
    const data = [...students];
    setStudents(data);
    let check = false;
    for(let i of data){
      let tmp : Student = Object.assign({}, i);
      if(tmp.id == result.data.id){
        alert("Mã SV Trùng Nhau, Bạn vui lòng Nhập Lại!")
        check =true;
      }
    }
    if(!check)
    {
      const dataAdd = [...students, result.data];
      setStudents(dataAdd);
      localStorage.setItem("student_list", JSON.stringify(dataAdd));
    }
   
  };
  //  Reset
  const Reset = () => {
    window.location.reload();
  };

  //edit 
  const handle_Edit = async (record: any) => {
    const result = await modalRef!.current!.show(record);
    console.log(result);
    const data = students.map((s) => {
      if (s.id === result.data.id) {
        s = result.data;
      }
      return s;
    });
    console.log(data);
    setStudents(data);
  };

  //delete
  const handle_Delete = (record: any) => {
    const items = students;
    // const index = items.findIndex((item: any) => item.id === record.id);
    console.log(items);
    const std = items.filter((item: any, index: number) => {
      return item && item.id !== record.id;
    });
    console.log(std);
    setStudents(std);
    localStorage.setItem("student_list", JSON.stringify(std));
  };

  // tìm kiếm Name
  const onSearch = (value: any) => {
    const items = students;
    let searchData = items.filter(function (obj) {
        return obj.name.toLowerCase().includes(value.toLowerCase());
    });
    setStudents(searchData);
  };

  //tìm kiếm Gender
  const onChange: TableProps<Student>["onChange"] = (filters) => {
    console.log(filters);
  };

  return (
    <>
      <div style={{ float: "right", marginBottom: 5 }}>
        <Button type="primary" onClick={openModal}>
          Add
        </Button>
        <Button style={{ margin: 5 }} type="dashed" onClick={Reset}>
          Reset
        </Button>
      </div>
      <div style={{ float: "left", marginBottom: 5 }}>
        <Search
          placeholder="input search name"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </div>
      <Table columns={columns} dataSource={students} onChange={onChange} />
      <StudentModal ref={modalRef} />
    </>
  );
};
