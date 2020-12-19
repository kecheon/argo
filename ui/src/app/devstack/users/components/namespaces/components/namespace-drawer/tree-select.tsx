import * as React from 'react';
import { TreeSelect } from 'antd';
import ReactDOM = require('react-dom');
const { TreeNode } = TreeSelect;

class Demo extends React.Component {
  public state = {
    value: '',
  };

  public onChange = (value: any) => {
    console.log(value);
    this.setState({ value });
  };

  public render() {
    return (
      <TreeSelect
        showSearch={true}
        style={{ width: '100%' }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder='Please select'
        allowClear={true}
        multiple={true}
        treeDefaultExpandAll={true}
        onChange={this.onChange}
      >
        <TreeNode value='parent 1' title='parent 1'>
          <TreeNode value='parent 1-0' title='parent 1-0'>
            <TreeNode value='leaf1' title='my leaf' />
            <TreeNode value='leaf2' title='your leaf' />
          </TreeNode>
          <TreeNode value='parent 1-1' title='parent 1-1'>
            <TreeNode value='sss' title={<b style={{ color: '#08c' }}>sss</b>} />
          </TreeNode>
        </TreeNode>
      </TreeSelect>
    );
  }
}

export default Demo;