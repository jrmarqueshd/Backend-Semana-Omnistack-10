const axios = require("axios").default;

const api = axios.create({
	baseURL: "https://api.github.com/users/"
});

module.exports = api;
