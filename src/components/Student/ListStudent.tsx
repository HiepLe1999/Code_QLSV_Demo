import { Button, Space, Table, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AudioOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { ModalRefAttribute } from "../../common/types/ModalType";
import { StudentModal } from "./StudentModal";

// initial data

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
      render: (text) => <a>{text}</a>,
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
  const openModal = async () => {
    const result = await modalRef!.current!.show();
    const data = [...students, result.data];
    setStudents(data);
    console.log(data);
    localStorage.setItem("student_list", JSON.stringify(data));
  };

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

  const handle_Delete = (record: any) => {
    const items = students;
    const index = items.findIndex((item: any) => item.id === record.id);
    console.log(items);
    const r = items.splice(index, 1);
    setStudents(r);
  };
 
  const onSearch = (value: string) =>{
  
    const items = students;
    let searchData = items.filter(function (obj) {
        return obj.name.toLowerCase().includes(value.toLowerCase());
    });
   
    setStudents(searchData);
}}
  return (
    
    <>
      <div style={{ float: "right", marginBottom: 5 }}>
        <Button type="primary" onClick={openModal}>
          Add
        </Button>
      </div>
      <div style={{ float: "left", marginBottom: 5 }}>
      <Search 
          
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
          
        />
         </div>
      <Table columns={columns} dataSource={students} />
      <StudentModal ref={modalRef} />
    </>
  );
};
