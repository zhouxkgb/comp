
import React from "react";
import { Input } from 'antd';
import SelectRich from "../components/SelectRich";
import FormRich from "../components/FormRich";

const units = [
    { key: '1', value: '#1号机组' },
    { key: '2', value: '#2号机组' },
    { key: '9', value: '#9号机组' },
    { key: '0', value: '#0号机组' },
]

const reqObjs = [
    { key: 'E', value: '设备' },
    { key: 'S', value: '系统' },
    { key: 'L', value: '构筑物' },
    { key: 'U', value: 'UIC' },
    { key: 'N', value: '名称' },
]
const formData = [
    {
        label: '电厂',
        component: <Input value='霞浦一厂' disabled />,
    }, {
        label: '机组',
        component: <SelectRich options={units} />
    }, {
        label: '申请对象',
        component: <SelectRich options={reqObjs} />
    }, {
        label: '位置补充描述',
        component: <Input />
    }
]

function ReqObjForm() {

    return (
        <>
            <FormRich formData={formData} />
        </>
    )
}
export default ReqObjForm;