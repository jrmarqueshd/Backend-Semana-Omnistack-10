const api = require("../services/api");
const Dev = require("../models/Dev");

const parserStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
	async store(req, res) {
		const { github_username, techs, latitude, longitude } = req.body;

		let dev = await Dev.findOne({ github_username });

		if (!dev) {
			const response = await api.get(`${github_username}`);
			const { name = login, avatar_url, bio } = response.data;
			const techsArray = parserStringAsArray(techs);

			const location = {
				type: "Point",
				coordinates: [longitude, latitude]
			};

			dev = await Dev.create({
				name,
				github_username,
				bio,
				avatar_url,
				techs: techsArray,
				location
			});
		}

		return res.json(dev);
	},

	async index(req, res) {
		const devs = await Dev.find();

		return res.json(devs);
	}
};
