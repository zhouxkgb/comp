import React from "react";
import { Form, Row, Col } from "antd";

function FormRich(props) {
    const { formData } = props
    const [form] = Form.useForm();
    return (
        <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            form={form}
        >
            <Row>
                <Col span={6}>
                    {
                        formData.map((item, index) =>
                            <Form.Item label={item.label} key={index}>
                                {item.component}
                            </Form.Item>
                        )
                    }

                </Col>
            </Row>
        </Form>
    )
}

export default FormRich;