import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Navdata = () => {
  const router = useRouter();
  const [isChat, setIsChat] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isSettings, setIsSettings] = useState(false);

  const [iscurrentState, setIscurrentState] = useState('Chat');

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute('subitems')) {
      const ul = document.getElementById('two-column-menu');
      const iconItems = ul.querySelectorAll('.nav-icon.active');
      const activeIconItems = [...iconItems];
      activeIconItems.forEach(item => {
        item.classList.remove('active');
        const id = item.getAttribute('subitems');
        if (document.getElementById(id)) document.getElementById(id).classList.remove('show');
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove('twocolumn-panel');
    if (iscurrentState !== 'Chat') {
      setIsChat(false);
    }
  }, [router]);

  const menuItems = [
    {
      label: 'Menu',
      isHeader: true,
    },
    {
      id: 'Chat',
      label: 'Chat',
      icon: 'ri-chat-1-fill',
      path: '/chat',
      stateVariables: isChat,
      click(e) {
        e.preventDefault();
        setIsChat(!isChat);
        setIscurrentState('Chat');
        updateIconSidebar(e);
      },
    },
    {
      id: 'Profile',
      label: 'Profile',
      icon: ' ri-user-fill',
      path: '/profile',
      stateVariables: isProfile,
      click(e) {
        e.preventDefault();
        setIsProfile(!isProfile);
        setIscurrentState('Profile');
        updateIconSidebar(e);
      },
    },
    {
      id: 'Settings',
      label: 'Settings',
      icon: '  ri-settings-2-fill',
      path: '/settings',
      stateVariables: isSettings,
      click(e) {
        e.preventDefault();
        setIsSettings(!isSettings);
        setIscurrentState('Settings');
        updateIconSidebar(e);
      },
    },
  ];
  return <>{menuItems}</>;
};
export default Navdata;
