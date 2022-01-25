import React, { useState } from "react";
import { Table, Divider, Modal, Input } from "antd";

const data = [
    {
        key: '1',
        stepNo: '1',
        stepDesc: '西湖区湖底公园1号',
    }, {
        key: '2',
        stepNo: '2',
        stepDesc: '西湖区湖底公园2号',
    }, {
        key: '3',
        stepNo: '3',
        stepDesc: '西湖区湖底公园3号',
    },
];

function StepTable() {
    const [dataSource, setDataSource] = useState(data);

    const handlInsert = (e) => {
        e.preventDefault();
        setVisible(true)
    }

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
        }, {
            title: '步序',
            dataIndex: 'stepNo',
            key: 'stepNo',
        }, {
            title: '操作',
            dataIndex: 'action',
            key: 'aciton',
            render: (text, record, index) => {
                return <>
                    <a href="" onClick={handlInsert}>该行后插入</a>
                    <Divider type="vertical" />
                    <a href="#">更新步序</a>
                </>
            }
        }
    ];

    const handleOk = () => {
        // if (dataSource[index].stepNo === dataSource[index + 1]?.stepNo) {
        //     setDataSource()
        // } else {
        //     setDataSource()
        // }

    }
    const handleCancel = () => { setVisible(false) }
    const [visible, setVisible] = useState(false)

    return (
        <div style={{ width: '500px' }}>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
            />;
            <Modal
                title="新增步序"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Input.TextArea rows={6}></Input.TextArea>
            </Modal>
        </div>
    )

}

export default StepTable;