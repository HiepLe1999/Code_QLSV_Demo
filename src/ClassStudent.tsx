import { Button, Table} from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useRef, useState } from "react";
import { ModalRefAttribute } from "../../common/types/ModalType";
import { ClassModal } from "./ClassModal";


interface ClassStudent {
  idClass: number;
  nameClass: string;
}



export const ClassStudent: React.FC = () => {
  const columns: ColumnsType<ClassStudent> = [
    {
      title: "Mã Lớp",
      dataIndex: "idClass",
      key: "idClass",
    },
    {
      title: "Tên Lớp",
      dataIndex: "class",
      key: "class",
    },
   
  ];
  const data: ClassStudent[] = [];

  const modalRef = useRef<ModalRefAttribute>(); // use ref to open modal.
  const [students, setStudents] = useState<ClassStudent[]>([]);

  useEffect(() => {
    const datast: any = localStorage.getItem("student_class");
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
      let tmp : ClassStudent = Object.assign({}, i);
      if(tmp.idClass === result.data.idClass || result.data.idClass === result.data.class){
        alert("Mã Lớp Trùng Nhau hoặc mã Lớp trùng mã Sinh Viên, Bạn vui lòng Nhập Lại!")
        check =true;
      }
    }
    if(!check)
    {
      const dataAdd = [...students, result.data];
      setStudents(dataAdd);
      localStorage.setItem("student_class", JSON.stringify(dataAdd));

    }
   
  };
 
  return (
    <>
      <div style={{ float: "right", marginBottom: 5 }}>
        <Button type="primary" onClick={openModal}>
          Add
        </Button>
      </div>
      
      <Table columns={columns} dataSource={students} />
      <ClassModal ref={modalRef} />
    </>
  );
};
