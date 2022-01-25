import React from "react";
import { Select } from "antd";

const { Option } = Select;

const filter = (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0


const SelectRich = (props) => {
    const { options = [], selOthers, optOthers } = props
    return (
        <Select
            showSearch
            placeholder='请选择'
            filterOption={filter}
            {...selOthers}
        >
            {options.map((item, index) =>
                <Option
                    key={index}
                    value={item.key}
                    {...optOthers}
                >
                    {item.value}
                </Option>
            )}
        </Select>
    )
}
export default SelectRich;