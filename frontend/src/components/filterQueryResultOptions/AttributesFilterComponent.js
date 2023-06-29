import React from 'react';
import { Form } from "react-bootstrap";

const AttributesFilterComponent = () => {
  return (
    <>
    {/* first create an object that has an array of two objects */}
    {/* map through the array and print out their objects using Object.keys(item) */}
      {[{ color: ['red', 'blue', 'green'] }, { ram: ['1 TB', '2 TB'] }].map((item, idx) => (
        <div key={idx} className='mb-3'>
          <Form.Label><b>{Object.keys(item)}</b></Form.Label>
          {/* Next print out each of their values using item[object.keys(item)] */}
          {item[Object.keys(item)].map((i, idx) => (
            <Form.Check
              key={idx}
              type="checkbox"
              id="default-checkbox"
              label={i}
            />
          )
          )}
        </div>
      ))}

    </>
  );
};

export default AttributesFilterComponent;