import React from 'react';
import { Table } from 'antd';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import { arrayMoveImmutable } from 'array-move';
import './step.css';

const DragHandle = SortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);

const columns = [
    {
        title: '序号',
        dataIndex: '',
        width: 40,
        className: 'drag-visible',
        render: (text, record, index) => (index + 1) * 10
    }, {
        title: '步骤描述',
        dataIndex: 'name',
        className: 'drag-visible',
    }, {
        title: '步序',
        dataIndex: 'stepNo',
        width: 30,
        className: 'drag-visible',
    }, {
        title: 'Sort',
        dataIndex: 'sort',
        width: 30,
        className: 'drag-visible',
        render: () => <DragHandle />,
    },
];

const data = [
    {
        name: '步序内容xxxx',
        seq: 1,
        stepNo: 1,
        index: 0,
    },
    {
        name: '步序内容yyyy',
        seq: 2,
        stepNo: 2,
        index: 1,
    },
    {
        name: '步序内容zzzzz',
        seq: 3,
        stepNo: 3,
        index: 2,
    },
];

const SortableItem = SortableElement(props => <tr {...props} />);
const SortableBody = SortableContainer(props => <tbody {...props} />);

export default class SortableTable extends React.Component {
    state = {
        dataSource: data,
    };

    onSortEnd = ({ oldIndex, newIndex }) => {
        const { dataSource } = this.state;
        if (oldIndex !== newIndex) {
            const newData = arrayMoveImmutable([].concat(dataSource), oldIndex, newIndex).filter(
                el => !!el,
            );
            console.log('Sorted items: ', newData);
            this.setState({ dataSource: newData });
        }
    };

    DraggableContainer = props => (
        <SortableBody
            useDragHandle
            disableAutoscroll
            helperClass="row-dragging"
            onSortEnd={this.onSortEnd}
            {...props}
        />
    );

    DraggableBodyRow = ({ className, style, ...restProps }) => {
        const { dataSource } = this.state;
        // function findIndex base on Table rowKey props and should always be a right array index
        const index = dataSource.findIndex(x => x.index === restProps['data-row-key']);
        return <SortableItem index={index} {...restProps} />;
    };

    render() {
        const { dataSource } = this.state;

        return (
            <Table
                pagination={false}
                style={{width:500}}
                dataSource={dataSource}
                columns={columns}
                rowKey="index"
                components={{
                    body: {
                        wrapper: this.DraggableContainer,
                        row: this.DraggableBodyRow,
                    },
                }}
            />
        );
    }
}