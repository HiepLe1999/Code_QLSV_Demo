import { Modal, Form, Input, Select } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import { SaveResult } from "../../common/types/ModalType";


const { Option } = Select;

let guard: (result: SaveResult) => void;

export const ClassModal = forwardRef((_props: any, ref: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    show: (data?: []) => {
      return new Promise<SaveResult>((resolve) => {
        setIsModalVisible(true);
        if (data) form.setFieldsValue(data);
        guard = resolve;
      });
    },

    close: () => {
      setIsModalVisible(false);
    },
  }));

  const save = async () => {
    const values = await form.validateFields();
    form.resetFields();
    setIsModalVisible(false);
    guard({
      changed: true,
      data: values,
    });
  };

  const cancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  //#region form

  const onFinish = (values: any) => {
    console.log(values);
  };

  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
  };

  //#end region
  return (
    <>
      <Modal
        title="Add Class"
        visible={isModalVisible}
        okText="Save"
        onOk={save}
        onCancel={cancel}
        width={1000}
      >
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="idClass"
            label="Mã Lớp"
            rules={[
              { required: true, message: "Id is required" },
            ]}
          >
            <Input type={"number"} />
          </Form.Item>
          <Form.Item
            name = "class"
            label =  "Tên Lớp"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});
