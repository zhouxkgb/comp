import React from 'react';
import { Button, Input, Switch, Table, Space } from 'antd';
import { getDiffIndex, calcModel, oneModel, getIncModel } from './Util';
class App extends React.Component {

  state = {
    data: '',
    seq: '',
    open: false
  }


  handOpen = () => {
    const { open } = this.state
    this.setState({
      open: !open
    })
  }



  formatSeq = (str) => {
    let arr = str.split('\n')
    return arr.reduce((total, cur, curIndex) => {
      if (curIndex === 0) {
        total[curIndex] = 1
      } else {
        let preSeq = total[curIndex - 1]
        total[curIndex] = cur === arr[curIndex - 1] ? preSeq : preSeq + 1
      }
      return total
    }, []).join('\n')
  }


  handUp = (record) => {
    const { data, seq } = this.state
    let index = record.index / 10 - 1
    let seqArr = seq.replaceAll('\n', '').split('')
    seqArr.splice(index, 1, seqArr[index - 1])
    this.setState({
      data,
      seq: seqArr.join('\n')
    })
  }

  handDown = (record) => {
    const { data, seq } = this.state
    let index = record.index / 10 - 1
    let seqArr = seq.replaceAll('\n', '').split('')
    let one = oneModel(seqArr[index - 1], seqArr[index + 1])
    seqArr.splice(index, 1, one)
    this.setState({
      data,
      seq: seqArr.join('\n')
    })
  }

  getColumns = () => {
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
          <a onClick={() => this.handUp(record)}>Up</a>
          <a onClick={() => this.handDown(record)}>New</a>
        </Space>
      )
    }]
  }

  getDataSource = () => {
    const { data, seq } = this.state
    return  data.split('\n').map((val, index) => ({
      key: index,
      index: (index + 1) * 10,
      discribe: val,
      step: seq.split('\n')[index]
    }))
  }


  handChange = (e) => {
    let curValue = e.target.value

    const { data, seq } = this.state

    //const [str, diffIndex, diffStr] = getDiffIndex(curValue, data)
    //curValue = diffStr.length > 1 ? curValue.trim().replaceAll(/\n{2,}/g, '\n') : curValue //连续\n替换成一个\n
    //let newSeq = calcModel(seq, data, curValue, diffStr)

    this.setState({
      data: curValue,
      seq: this.calcNewModel(curValue, data, seq)
    })
  }


  calcNewModel = (curValue, data, model) => {
    const curNs = Array.from(curValue.matchAll('\n'), v => v.index)
    const dataNs = Array.from(data.matchAll('\n'), v => v.index)
    const curLen = curNs.length
    const daLen = dataNs.length
    // 如果\n的数量一致,模型不需要更新
    if (curLen === daLen) {
      return model || ''
    }
    // 如果输入新的\n,更新模型
    let pre = []
    if (curLen > daLen) {
      curNs.forEach((val, index) => {
        if (val === daLen[index]) { // 索引相同
          pre.push(model[index])
        } else {
          pre = pre.concat(getIncModel(curLen - daLen, model[index - 1], model[index]))
        }
      })
      return pre.join('\n')
    }
    // 如果删除了\n,更新模型
    return
  }

  // 找到不同之前有几个模型元素
  findIndex = (str, diff) => {
    let index = 0
    for (let i = 0; i < diff; i++) {
      if (str[i] === '\n') index++
    }
    return index
  }


  render () {
    const { data, seq, open } = this.state
    return (

      <div className="App" style={{ width: '380px' }}>
        <div style={{ width: '260px', height: '30px' }}>
          <Switch onChange={this.handOpen} checked={open} style={{ float: 'right' }}></Switch>
        </div>
        {/* {
          !open ? ( */}
        <div style={{ width: '380px' }}>
          <Input.TextArea disabled cols={2} rows={10} style={{ width: '80px' }} value={data.split('\n').map((v, i) => 10 * (i + 1)).join('\n')}></Input.TextArea>
          <Input.TextArea
            value={data}
            rows={10}
            style={{ width: '200px' }}
            onChange={this.handChange}
            onClick={this.handClick}
          ></Input.TextArea>
          <Input.TextArea disabled cols={2} rows={10} style={{ width: '80px' }} value={this.formatSeq(seq)}></Input.TextArea><br />
          <Button type='primary' onClick={this.handClick}>submit</Button>
        </div>
        {/* ) : ( */}
        <div style={{ float: 'right' }}>
          <Table columns={this.getColumns()} dataSource={this.getDataSource()} pagination={false} />
        </div>
        {/* ) 
        }
*/}
      </div>
    );
  }
}

export default App;
