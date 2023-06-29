import axios from "axios";

const API_URL = "http://localhost:8082/api/auth";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "/signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          console.log(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, image) {
    console.log(username + " " + email + " " + password);
    const data = {
      username,
      email,
      password
    };
    const data1 = new Blob([JSON.stringify(data)], { type: 'application/json' });

        const formData = new FormData();
        formData.append('Image', image);
        formData.append('data', data1);

    console.log("Here\n");

    return axios.post(API_URL + "/signup", formData);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
