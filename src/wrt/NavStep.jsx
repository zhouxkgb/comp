import React, { useState } from "react";
import { Steps, Button, message } from 'antd';
import ReqObjForm from "./ReqObjForm";
import './navstep.css'

const { Step } = Steps;
function NavStep() {

    const steps = [{
        title: '选择对象',
        content: ReqObjForm,
    }, {
        title: '描述缺陷',
        content: 'Second-content',
    }, {
        title: '上传附件',
        content: 'Last-content',
    }, {
        title: '确认完成',
        content: 'Last-content',
    }];


    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    return (
        <>
            <Steps current={current}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content">
                {steps[current].content()}
            </div>
            <div className="steps-action">
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </>
    );
};

export default NavStep;