import React from 'react';
import { Dropdown } from 'react-bootstrap';

const ActionDropdown = ({handleSelectevent}) => {
 

  return (
    <Dropdown onSelect={handleSelectevent}>
      <Dropdown.Toggle variant="success" className='colorteal' id="dropdown-basic">
        Actions
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="status">
          <i className="material-icons">&#xE03B;</i> status
        </Dropdown.Item>
        <Dropdown.Item eventKey="edit">
          <i className="material-icons">&#xE254;</i> Edit
        </Dropdown.Item>
        <Dropdown.Item eventKey="delete">
          <i className="material-icons">&#xE872;</i> Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ActionDropdown;
