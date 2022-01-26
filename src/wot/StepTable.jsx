import React, { useState, useRef } from "react";
import { Table, Divider, Modal, Input, Tooltip, Popover, Popconfirm, message, Form } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

// 初始化测试数据
const data = [
    {
        key: '1',
        stepNo: 1,
        stepDesc: '西湖区湖底公园11111111111111111111111111111号',
    }, {
        key: '2',
        stepNo: 2,
        stepDesc: '西湖区湖底公园22号',
    }, {
        key: '3',
        stepNo: 2,
        stepDesc: '西湖区湖底公园22号',
    }, {
        key: '4',
        stepNo: 3,
        stepDesc: '西湖区湖底公园33号',
    }, {
        key: '5',
        stepNo: 4,
        stepDesc: '西湖区湖底公园44号',
    }, {
        key: '6',
        stepNo: 4,
        stepDesc: '西湖区湖底公园44号',
    }, {
        key: '7',
        stepNo: 5,
        stepDesc: '西湖区湖底公园55号',
    },
];

function StepTable() {

    const [dataSource, setDataSource] = useState(data);

    /**
     * 新增步骤事件
     * @param {*} index 新增上一行索引 
     */
    const handleInsert = (index) => {
        window.event.preventDefault();
        setVisible(true)
        setCurIndex(index)
    }

    /**
     * 删除提示框确认事件
     * @param {*} index 删除索引 
     */
    const handleDelete = (index) => {
        setDataSource(
            function () {
                // 相同步序行删除，步序不更新
                if (dataSource[index].stepNo === dataSource[index + 1]?.stepNo || dataSource[index].stepNo === dataSource[index - 1]?.stepNo) {
                    return [...dataSource.slice(0, index), ...dataSource.slice(index + 1)]
                }
                // 更新后续步骤步序
                return [
                    ...dataSource.slice(0, index),
                    ...dataSource.slice(index + 1).map(item => ({
                        key: item.key,
                        stepNo: --item.stepNo,
                        stepDesc: item.stepDesc,
                    }))
                ]
            }
        )
        message.success('Delete Success');
    }

    /**
     * 步骤更新事件
     * @param {*} index 更新索引
     */
    const handleUpdate = (index) => { }


    // 表格抬头信息
    const columns = [
        {
            title: '序号',
            dataIndex: 'seq',
            key: 'seq',
            render: (text, record, index) => index + 1
        }, {
            title: '步骤描述',
            dataIndex: 'stepDesc',
            key: 'stepDesc',
            editable: true,
            render: (text, record, index) => <Popover content={text}>{text.length >= 10 ? text.slice(0, 10) + '...' : text}</Popover>
        }, {
            title: '步序',
            dataIndex: 'stepNo',
            key: 'stepNo',
        }, {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record, index) => {
                return <>
                    <Tooltip placement="topLeft" title='下方增加步骤'><PlusOutlined onClick={() => handleInsert(index)} /></Tooltip>
                    <Divider type="vertical" />
                    <Tooltip placement="topLeft" title='修改步序描述'><EditOutlined onClick={() => { handleUpdate(index) }} /></Tooltip>
                    <Divider type="vertical" />
                    <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={() => handleDelete(index)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tooltip placement="topLeft" title='删除当前步序'><DeleteOutlined /></Tooltip>
                    </Popconfirm>
                </>
            }
        }
    ];

    // 当前操作索引值
    const [curIndex, setCurIndex] = useState(-1)

    // 计算序列
    const calcData = (desc) => {
        // 当前行与下一行步序一致
        if (dataSource[curIndex].stepNo === dataSource[curIndex + 1]?.stepNo) {
            const addArr = desc.split('\n').map(val => ({
                key: val,
                stepNo: dataSource[curIndex].stepNo,
                stepDesc: val
            }))
            setDataSource([...dataSource.slice(0, curIndex + 1), ...addArr, ...dataSource.slice(curIndex + 1)])
        } else {
            // 当前行与下一行步序不一致
            const addArr = desc.split('\n').map((val, index) => ({
                key: val,
                stepNo: +dataSource[curIndex].stepNo + index + 1,
                stepDesc: val
            }))
            const tails = dataSource.slice(curIndex + 1).map(item => ({
                key: item.key,
                stepDesc: item.stepDesc,
                stepNo: +item.stepNo + addArr.length
            }))
            setDataSource([...dataSource.slice(0, curIndex + 1), ...addArr, ...tails])
        }
        setVisible(false)
        message.success('Insert Success');
    }

    /**
     * 新增步骤弹框确认事件
     */
    const handleOk = () => {
        form.validateFields()
            .then(data => {
                calcData(data.stepDesc)
            })
            .catch(err => {
                console.log('err', err)
            })
    }

    const [visible, setVisible] = useState(false)
    // 新增步骤弹框取消事件
    const handleCancel = () => { setVisible(false) }
    const [form] = Form.useForm()
    const textEl = useRef(null);
    return (
        <div style={{ width: '500px' }}>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
            />;
            <Modal
                title="新增步骤"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    ref={textEl}
                >
                    <Form.Item
                        name="stepDesc"
                        rules={[{ required: true, message: 'Please input your step description!' }]}
                    >
                        <Input.TextArea
                            rows={6}
                            placeholder="请输入步骤描述"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div >
    )

}

export default StepTable;