import axios from "axios";

export async function postRegister(username, password) {
  try {
    const res = await axios.post('/api/register', { username, password });
    return res;
  } catch (error) {
    console.error("postRegister error: ", error);
    return error;
  }
};

export async function postLogin(username, password) {
  try {
    const res = await axios.post('/api/login', { username, password });
    return res;
  } catch (error) {
    console.error("postLogin error: ", error);
    return error;
  }
};

// apiService.js
class ApiService {
  constructor() {
    this.token = null;
    this.onUnauthorizedCallback = null;
  }

  setToken(token) {
    this.token = token;
  }

  // TODO: set this to the logout function from AuthProvider
  setOnUnauthorizedCallback(callback) {
    this.onUnauthorizedCallback = callback;
  }

  async deleteCategory(id) {
    console.log('deleting category: ', id);
  
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token,
        },
      });

      if (res.status === 200) {
        console.log('Category deleted successfully');
        return res.json();
      }
    } catch (error) {
      console.error("deleteCategory error: ", error);
    }
  }

  async saveCategory(id, category) {
    if(!id) {
      try {
        console.log('saving new category: ', category, 'with id: ', id);
        const res = await fetch('/api/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token,
          },
          body: JSON.stringify(category),
        });

        if (res.status === 200) {
          const responseData = await res.json();
          console.log('response from saveCategory: ', responseData.data);
          
          return responseData.data;
        }
      }
      catch (error) {
        console.error("saveCategory (saving new) error: ", error);
      }
    } else {
      try {
        console.log('updating category: ', category, 'with id: ', id);
        const res = await fetch(`/api/categories/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token,
          },
          body: JSON.stringify(category),
        });

        if (res.status === 200) {
          const responseData = await res.json();
          console.log('response from updateCategory:', responseData);
  
          return responseData.data;
        }
      }
      catch (error) {
        console.error("saveCategory (editing existing) error: ", error);
      }
    }
  }

  async getCategories() {
    try {
      const res = await fetch('/api/categories', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token,
        },
      });

      if (res.status === 200) {
        const responseData = await res.json();
        console.log('response from getCategories:', responseData);
        return responseData.data;
      }
    } catch (error) {
      console.error("getCategories error: ", error);
    }
  }

  async getData() {
    try {
      const res = await fetch('/api/data', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token,
        },
      });

      // TODO: add this to all API calls that require authentication
      if (res.status === 401 || res.status === 403) {
        if (this.onUnauthorizedCallback) {
          this.onUnauthorizedCallback();
        }
        return;
      }

      if (res.status === 200) {
        const responseData = await res.json();
        console.log('response from getData:', responseData);
        return responseData.data;
      }
    } catch (error) {
      console.error("getData error: ", error);
    }
  }

  async submitData(data) {
    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token,
        },
        body: data ? JSON.stringify(data) : null,
      });

      if (res.status === 200) {
        console.log('Data posted successfully');
        
        const responseData = await res.json();
        console.log(responseData);

        return responseData.data;
      }
    } catch (error) {
      console.error("submitData error: ", error);
    }
  }
}

// export a single instance
export default new ApiService();
