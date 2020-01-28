const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

const app = express();

mongoose.connect("mongodb://localhost/omnistack10", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});

// app.use(cors({origin: 'http://localhost:3000'})); // Libera o acceso somente para uma origin em específico.
app.use(cors()); // Libera o acesso para a API para qualquer origin!
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333);
