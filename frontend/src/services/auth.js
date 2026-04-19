const apiBase = import.meta.env.VITE_API_BASE_URL || "";
const AUTH_TOKEN_KEY = "ilovepdf_auth_token";

export function getStoredToken() {
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

export function storeToken(token) {
  window.localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearToken() {
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
}

function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function formatDetail(detail) {
  if (!detail) {
    return "Request failed.";
  }

  if (typeof detail === "string") {
    return detail;
  }

  if (Array.isArray(detail)) {
    return detail
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }
        if (item?.msg) {
          const path = Array.isArray(item.loc) ? item.loc.slice(1).join(" ") : "";
          return path ? `${path}: ${item.msg}` : item.msg;
        }
        return JSON.stringify(item);
      })
      .join(". ");
  }

  if (typeof detail === "object") {
    if (detail.msg) {
      return detail.msg;
    }
    return JSON.stringify(detail);
  }

  return String(detail);
}

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(formatDetail(data.detail || data.message));
  }
  return data;
}

export async function signup(payload) {
  const response = await fetch(`${apiBase}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return parseResponse(response);
}

export async function login(payload) {
  const response = await fetch(`${apiBase}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return parseResponse(response);
}

export async function fetchMe(token) {
  const response = await fetch(`${apiBase}/api/auth/me`, {
    headers: {
      ...authHeaders(token),
    },
  });
  return parseResponse(response);
}

export async function logout(token) {
  const response = await fetch(`${apiBase}/api/auth/logout`, {
    method: "POST",
    headers: {
      ...authHeaders(token),
    },
  });
  return parseResponse(response);
}
