import React, { useEffect, useState } from 'react';

const App = React.createContext({'name':"zhouxk"})

const DataList = () => {

    const [data, setDAta] = useState('没有数据.')
    // 副作用
    useEffect(() => { console.log(1) }, [data])

    /**
     * 点击事件
     * @param {*} _e 
     */
    function handleClick(_e) {
        setDAta(data => {
            return typeof data === 'string'
                ? [{ name: "zhouxk", age: 30, gender: "male" }]
                : [...data, { name: "zhouxk", age: 30, gender: "male" }]
        })
    }

    return (
        <>
            <button onClick={handleClick}>添加一行</button>
            <ul>
                {
                    typeof data === 'string'
                        ? data
                        : data?.map((val, idx) => <li key={idx}>姓名:{val?.name} -- {val?.age} ---{val?.gender}</li>)
                }
            </ul>
        </>
    )
}

export default DataList;