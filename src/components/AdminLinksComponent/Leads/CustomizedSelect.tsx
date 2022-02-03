
import React, {useState, useEffect} from 'react';
import '../MyStreams/streams.scss';

export default function CustomizedSelect(props) {
  const [type, setType] = useState('');
  useEffect(() => {
    props.data.map((item: any, index: number) => (
        setType(item.direction.id)
    ))
  })

  const handleChange = (event:any) => {
    setType(event.target.value);
  };
  return (
    <div className="customized-select d-flex justify-content-center">
        <select
          className="p-2 cursor-pointer"
          aria-label=".form-select-lg example"
          onChange={handleChange}
          value={type}
        >
          {props.data.map((item: any, index: number) => (
            <option key={index} value={item.direction.name}>{item.direction.name}</option>
          ))}
        </select>
    </div>
  );
}