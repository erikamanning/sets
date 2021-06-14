
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="primary" light expand="md">
        <NavbarBrand href="/home">Sets</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="text-end" navbar>
            <NavItem>
              <NavLink color='text-light' href="/home">Leaderboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/home">Find Friends</NavLink>
            </NavItem>
            <NavItem>
                <NavLink color='text-light' href="/play">Play!</NavLink>
            </NavItem>
            <NavItem>
                <NavLink color='text-light' href="/profile">My Profile</NavLink>
            </NavItem>        
            <NavItem>
                <NavLink color='text-light' href="/login">Login</NavLink>
            </NavItem>    
            <NavItem>
                <NavLink color='text-light' href="/signup">Signup</NavLink>
            </NavItem>    
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;
