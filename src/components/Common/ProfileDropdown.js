import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import Image from 'next/image';
import { useRouter } from 'next/router';
import avatar1 from '../../../public/images/users/user-dummy-img.jpg';
import authThunk from '../../slices/auth/thunk';
import Link from 'next/link';

const ProfileDropdown = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(state => state?.Auth?.user || {});

  const logout = () => {
    dispatch(authThunk.logout({ router }));
  };

  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };
  return (
    <React.Fragment>
      <Dropdown isOpen={isProfileDropdown} toggle={toggleProfileDropdown} className="ms-sm-3 header-item topbar-user">
        <DropdownToggle tag="button" type="button" className="btn">
          <span className="d-flex align-items-center">
            <Image className="rounded-circle header-profile-user" src={avatar1} alt="Header Avatar" />
            <span className="text-start ms-xl-2">
              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                {`${user?.first_name}`}
              </span>
              <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">{user?.role?.type}</span>
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <h6 className="dropdown-header">Welcome {`${user?.first_name}`}!</h6>
          <DropdownItem>
            <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
            <Link href="/profile">
              <span className="align-middle">Profile</span>
            </Link>
          </DropdownItem>
          <DropdownItem onClick={logout}>
            <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{' '}
            <span className="align-middle" data-key="t-logout">
              Logout
            </span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileDropdown;
