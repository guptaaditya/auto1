import React from 'react'
import { Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import logo from 'src/logo.png'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const headerMenu = [
  {key: 1, href: `/merchants`, label: 'Merchants', exact: true},
  {key: 2, href: `/bids`, label: 'Bids'},
  {key: 3, href: `/merchant/add`, label: 'Add merchant', exact: true},
];
export default function Header(props) {
  let activeMenu = headerMenu.find(i => {
    return (props.location.pathname.indexOf(i.href) === 0);
  })
  if(activeMenu) activeMenu = activeMenu.key;
  else activeMenu = 0;
  return (
    <Navbar>
      <ToastContainer autoClose={2000} />
      <Navbar.Header>
        <Navbar.Brand>
          <img height={50} src={logo} alt="Auto 1 Group" />
        </Navbar.Brand>
      </Navbar.Header>
      <ul className="nav navbar-nav">
      {headerMenu.map((i, index) => (
        <li role="presentation" className={i.key === activeMenu ? 'active': ''} key={index}>
          <NavLink to={i.href}>{i.label}</NavLink>
        </li>
      ))}
      </ul>
    </Navbar>
  )
};
