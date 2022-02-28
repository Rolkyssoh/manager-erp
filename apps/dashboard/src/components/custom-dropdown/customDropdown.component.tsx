import { ActionButton, Text } from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

export const CustomDropdownComponent: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [timeOutId, setTimeOutId] = useState<any>(null);

  const state = useLocation();
  // const {user} = state;

  useEffect(() => {
    console.log('the current user', state);
  }, [localStorage]);

  const doLogout = () => {
    setOpen(false);
    localStorage.clear();
  };

  return (
    <div>
      {/* <button
        onClick={() => setOpen(!open)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        Select an option
      </button> */}
      <ActionButton text="Profile" onClick={() => setOpen(!open)} />
      {open && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <Text variant="xLarge">Hello, Name</Text>
          </div>
          <hr />
          <div className="dropdowninfos">
            <div className="dropdowninfos_details">
              <Text>Fist name</Text>
              <Text>Last name</Text>
              <Text>Email</Text>
            </div>
            <ActionButton className="editbuttonstyle" text="Edit" />
          </div>
          <hr />
          <div className="dropdown-pwd">
            <div>
              <Text>Password</Text>
            </div>
            <ActionButton className="editbuttonstyle" text="Edit" />
          </div>
          <hr />
          <div className="dropdown-footer">
            <ActionButton
              className="editbuttonstyle"
              text="Logout"
              onClick={doLogout}
            />
          </div>
        </div>
      )}
    </div>
  );
};
