import React from 'react';
import {connect} from 'react-redux';

import {Navbar, Link, Nav, NavDropdown, MenuItem} from 'react-bootstrap';

class Header extends React.Component {
    render() {
        // console.log(this.props);
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">0xDeadstock marketplace</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav pullRight>
                    Hello user
                </Nav>
            </Navbar>
        )
    }
}

export default connect()(Header);