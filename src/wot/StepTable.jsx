import React, { useEffect, useState } from "react";
import { Table, Divider, Modal, Input, Button } from "antd";

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
        stepNo: '2',
        stepDesc: '西湖区湖底公园3号',
    },
];

function StepTable() {
    const [dataSource, setDataSource] = useState(data);

    const handleInsert = (index) => {
        window.event.preventDefault();
        setVisible(true)
        setCurIndex(index)
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
            key: 'action',
            render: (text, record, index) => {
                return <>
                    <Button onClick={() => handleInsert(index)}>该行后插入</Button>
                    {/* <Divider type="vertical" />
                    <Button>更新步序</Button>
                    <Divider type="vertical" />
                    <Button>删除</Button> */}
                </>
            }
        }
    ];

    const [curIndex, setCurIndex] = useState(-1)
    const [addStep, setAddStep] = useState('')

    const handleOk = () => {

        if (dataSource[curIndex].stepNo === dataSource[curIndex + 1]?.stepNo) {
            const addArr = addStep.split('\n').map(val => ({
                key: val,
                stepNo: dataSource[curIndex].stepNo,
                stepDesc: val
            }))
            setDataSource([...dataSource.slice(0, curIndex + 1), ...addArr, ...dataSource.slice(curIndex + 1)])
        } else {
            const addArr = addStep.split('\n').map((val, index) => ({
                key: val,
                stepNo: +dataSource[curIndex].stepNo + index + 1,
                stepDesc: val
            }))
            console.log(addArr)
            const tail = dataSource.slice(curIndex + 1).map((item, index) => ({
                key: item.key,
                stepNo: +addArr.at(-1).stepNo + 1 + index,
                stepDesc: item.stepDesc
            }))
            setDataSource([...dataSource.slice(0, curIndex + 1), ...addArr, ...tail])
        }
        setVisible(false)
    }

    const handleCancel = () => { setVisible(false) }
    const [visible, setVisible] = useState(false)

    return (
        <div style={{ width: '600px' }}>
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
                <Input.TextArea rows={6} value={addStep} onChange={e => setAddStep(e.target.value)}></Input.TextArea>
            </Modal>
        </div>
    )

}

export default StepTable;