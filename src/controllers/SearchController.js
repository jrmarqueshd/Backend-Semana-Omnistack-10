const Dev = require("../models/Dev");
const DevController = require("./DevController");

const parserStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
	async index(req, res) {
		const { lat, long, techs } = req.query;
		const techsArray = parserStringAsArray(techs);

		const devs = await Dev.find({
			techs: {
				$in: techsArray
			},
			location: {
				$near: {
					$geometry: {
						type: "point",
						coordinates: [Number(long), Number(lat)]
					},
					$maxDistance: 10000
				}
			}
		});

		return res.json(devs);
	}
};
