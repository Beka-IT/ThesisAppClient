type key = 'refreshToken' | 'theme' | 'sidebar';
export const useCookie = (name: key) => {
  const setCookie = (data: string | object, expires?: number) => {
    let cookieValue: string;
    if (typeof data === 'string') {
      cookieValue = data;
    } else {
      cookieValue = JSON.stringify(data);
    }

    let cookieOptions = '';
    if (expires) {
      cookieOptions = `expires=${new Date(
        Date.now() + expires * 24 * 60 * 60 * 1000,
      )};`;
    }
    document.cookie = `${name}=${cookieValue};expires=${cookieOptions};path=/`;
  };

  const getCookie = () => {
    const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
    const cookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));

    if (cookie) {
      const cookieValue = cookie.substring(name.length + 1);
      try {
        return JSON.parse(cookieValue);
      } catch (e) {
        return cookieValue;
      }
    }
    return null;
  };

  const removeCookie = () => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  };

  return {
    setCookie,
    getCookie,
    removeCookie,
  };
};
