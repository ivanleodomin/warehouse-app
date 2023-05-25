import 'dotenv/config';

type Config = {
	[type: string]: string;
};

const config: Config = {};

config.port = process.env.PORT || '3000';
config.path = process.env.API_PATH || '/api';
config.marketUrl = process.env.MARKETPLACE_URL!

if (process.env.NODE_ENV == 'DEV') {
	config.mongodbUri = process.env.MONGODB_URI_DEV!
} else if (process.env.NODE_ENV == 'PROD') {
	config.mongodbUri = process.env.MONGODB_URI_PROD!
}

for (let key in config) {
	if (!config[key]) {
		throw new Error(`${key} variable not defined. App not to start!`);
	}
}

export default config;
