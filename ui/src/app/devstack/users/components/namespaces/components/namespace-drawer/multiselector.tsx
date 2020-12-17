import * as React from 'react';
import Select from 'react-select';
// import makeAnimated from 'react-select/animated';
// const animatedComponents = makeAnimated();

export const MultiSelect = (props: any) => {
  console.log(props);
  return (
    <Select
        options={props.options}
        value={props.value}
        isMulti={true}
        // onChange={(e: any) => {
        //     console.log(e)
        //     this.
        // }}
        onChange={props.onChange}
    />
  )
}
