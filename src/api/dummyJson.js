/**
 * API Service for DummyJSON Endpoints
 * All methods use clean async/await syntax and provide friendly error messages.
 */

const BASE_URL = 'https://dummyjson.com';

/**
 * Page 1: POST /auth/login
 * @param {Object} credentials - { username, password }
 * @returns {Promise<Object>} user data including accessToken / token
 */
export async function loginUser({ username, password }) {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.trim(),
        password: password.trim(),
        expiresInMins: 60,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed. Please check credentials.');
    }

    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}

/**
 * Page 2: GET /products
 * @param {Object} options - { limit, skip, search, category }
 * @returns {Promise<Object>} { products: Array, total: number, skip: number, limit: number }
 */
export async function fetchProducts({ limit = 20, skip = 0, search = '' } = {}) {
  try {
    let url = `${BASE_URL}/products?limit=${limit}&skip=${skip}`;
    if (search.trim()) {
      url = `${BASE_URL}/products/search?q=${encodeURIComponent(search.trim())}&limit=${limit}&skip=${skip}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load products: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/**
 * Page 3: GET /users
 * @param {Object} options - { limit, skip }
 * @returns {Promise<Object>} { users: Array, total: number, skip: number, limit: number }
 */
export async function fetchUsers({ limit = 20, skip = 0 } = {}) {
  try {
    const response = await fetch(`${BASE_URL}/users?limit=${limit}&skip=${skip}`);
    if (!response.ok) {
      throw new Error(`Failed to load users: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

/**
 * Fetch a single user by ID
 * @param {number|string} id
 * @returns {Promise<Object>} User object
 */
export async function fetchUserById(id) {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to load user #${id}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching user #${id}:`, error);
    throw error;
  }
}
