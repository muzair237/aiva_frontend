export const setCookie = (name, value, minutes, days, domain) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  } else if (minutes) {
    const date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  const domainString = domain ? `; domain=${domain}` : '';
  document.cookie = `${name}=${value || ''}${expires}; path=/${domainString}`;

  return true;
};

export const getCookie = name => {
  const nameEQ = `${name}=`;
  const ca = typeof document !== 'undefined' && document.cookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const deleteCookie = (name, domain) => {
  const expires = 'Thu, 01 Jan 1970 00:00:00 UTC';
  const domainString = domain ? `; domain=${domain}` : '';
  document.cookie = `${name}=; expires=${expires}; path=/${domainString}`;

  return true;
};

export const clearAllCookies = () => {
  const cookies = document.cookie.split(';');

  cookies.forEach(cookie => {
    const cookieName = cookie.split('=')[0].trim();
    document.cookie = `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  });

  return true;
};

export const isFormData = value => {
  const test = new FormData().has;

  try {
    return test.call(value, 0) || true;
  } catch (e) {
    return !test && {}.toString.call(value) === '[object FormData]';
  }
};
