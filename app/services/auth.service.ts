interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  fullName: string;
  email: string;
  password: string;
}

const API_URL = "http://localhost:8000/api";

export const authService = {
  async getCsrfToken() {
    const response = await fetch(`${API_URL}/auth/csrf/`, {
      credentials: "include",
    });
    const data = await response.json();
    return data.csrfToken;
  },

  async login(credentials: LoginCredentials) {
    // Get CSRF token first
    const csrfToken = await this.getCsrfToken();

    const response = await fetch(`${API_URL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    return response.json();
  },

  async signup(credentials: SignupCredentials) {
    // Get CSRF token first
    const csrfToken = await this.getCsrfToken();

    const response = await fetch(`${API_URL}/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Signup failed");
    }

    return response.json();
  },

  async logout() {
    const csrfToken = await this.getCsrfToken();

    const response = await fetch(`${API_URL}/auth/logout/`, {
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }
  },
};
