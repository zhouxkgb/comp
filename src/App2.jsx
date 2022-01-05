import React, { useState } from 'react';
import { Input, Table, Space } from 'antd';



function App () {

  const [text, setText] = useState('')
  const [textNumber, setTextNumber] = useState()


  const getTextArray = (valueText) => {
    const texts = valueText.split('\n')

    if (textNumber) {
      const textNumbers = textNumber.split('\n')
      const newData = []
      let lestNum = 0
      texts.forEach((ele, index) => {
        if (textNumbers?.[index]) {
          newData.push(textNumbers[index])
          lestNum = Number.parseInt(textNumbers[index])
        } else {
          newData.push(lestNum + 10)
          lestNum += 10
        }
      })
      return newData
    }

    return texts.map((ele, index) => index * 10)
  }

  const handUp = () => {

  }

  const handDown = () => {

  }

  const getColumns = () => {
    return [{
      title: '序号',
      dataIndex: 'index',
      key: 'index'
    }, {
      title: '步骤描述',
      dataIndex: 'discribe',
      key: 'discribe'
    }, {
      title: '步序',
      dataIndex: 'step',
      key: 'step'
    }, {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handUp(record)}>Up</a>
          <a onClick={() => handDown(record)}>New</a>
        </Space>
      )
    }]
  }

  const getDataSource = () => {
    return text?.split('\n').map((val, index) => ({
      key: index,
      index: (index + 1) * 10,
      discribe: val,
      step: textNumber?.split('\n')[index]
    }))
  }

  return (
    <>

      <Input.TextArea
        cols={10}
        rows={15}
        style={{ width: '300px', display: 'inline-block' }}
        value={text}
        onChange={e => {
          const value = e.currentTarget.value
          setText(value)
          setTextNumber(getTextArray(value).join('\n'))
        }}
      />
      <Input.TextArea
        cols={10}
        rows={15}
        style={{ width: '90px', display: 'inline-block' }}
        value={textNumber}
        onChange={(e) => {
          const value = e.currentTarget.value

          const arr = value.split('\n')
          const source = textNumber.split('\n')
          let editorIndex = -1
          arr.forEach((ele, index) => {
            if (ele !== source[index]) {
              editorIndex = index
            }
          })
          if (editorIndex > -1) {
            const number = Number.parseInt(arr[editorIndex], 10)
            for (let i = editorIndex; i < arr.length; i += 1) {
              arr[i] = number + ((i - editorIndex) * 10)
            }
            setTextNumber(arr.join('\n'))
          }
        }}
      />
      <Table
        columns={getColumns()}
        dataSource={getDataSource()}
        pagination={false}
      />
    </>
  )
}

export default App;