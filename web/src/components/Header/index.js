import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import logo from '~/assets/logo.svg';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, MenuItem } from './styles';

export default function Header({ location }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const [menuItems, setMenuItems] = useState([
    {
      name: 'students',
      selected: true,
    },
    {
      name: 'plans',
      selected: false,
    },
    {
      name: 'enrollments',
      selected: false,
    },
    {
      name: 'help',
      selected: false,
    },
  ]);

  useEffect(() => {
    const selected = menuItems.map(i =>
      location.pathname.includes(i.name)
        ? { name: i.name, selected: true }
        : { name: i.name, selected: false }
    );
    setMenuItems(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <div>
            <img src={logo} alt="GoBarber" />
            <span>GYMPOINT</span>
          </div>
          {menuItems.map(item => (
            <MenuItem
              key={item.name}
              to={`/${item.name}`}
              selected={item.selected}
            >
              {item.name}
            </MenuItem>
          ))}
        </nav>
        <aside>
          <strong>{user.name}</strong>
          <button type="button" onClick={handleSignOut}>
            log out
          </button>
        </aside>
      </Content>
    </Container>
  );
}

Header.propTypes = {
  location: PropTypes.objectOf(PropTypes.object).isRequired,
};
