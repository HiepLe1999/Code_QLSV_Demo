import { Modal, Form, Input, Select } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import { SaveResult } from "../../common/types/ModalType";


const { Option } = Select;

let guard: (result: SaveResult) => void;

export const StudentModal = forwardRef((_props: any, ref: any) => {
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
        title="Add Student"
        visible={isModalVisible}
        okText="Save"
        onOk={save}
        onCancel={cancel}
        width={1000}
      >
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="id"
            label="Mã SV"
            rules={[
              { required: true, message: "Name is required" },
            ]}
          >
            <Input type={"number"} />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: "Age is required" }]}
          >
            <Input type={"number"} min={12} max={60} />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Address is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Gender is required" }]}
          >
            <Select allowClear>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});
