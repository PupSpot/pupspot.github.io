const handleLogin = () => {
  // Clear any existing auth tokens/cookies
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
  
  window.location.href = '/api/auth/login';
}; 