import { Button, Input, Switch } from 'antd';
import React from 'react';


class App extends React.Component {

  state = {
    data: '',
    open: false
  }

  handChange = (e) => {
    let curValue = e.target.value
    this.setState({ data: curValue })
    console.log(e)
  }



  handClick = () => {
    const { data } = this.state
    console.table(data.split(' '))
  }

  handOpen = (val) => {
    console.log(val)
  }

  render () {
    const { data, open } = this.state
    return (

      <div className="App">
        <Switch onChange={this.handOpen} ></Switch><br/>
        <Input.TextArea cols={2} rows={10} value={data.split('\n').map((v, i) => 10 * (i + 1)).join('\n')}></Input.TextArea>
        <Input.TextArea cols={10} rows={10} value={data} onChange={this.handChange} ></Input.TextArea>
        <Input.TextArea cols={2} rows={10} value={data.split('\n').map((v, i) => i + 1).join('\n')}></Input.TextArea><br />
        <Button type='primary' onClick={this.handClick}>sumit</Button>
      </div>
    );
  }
}

export default App;
