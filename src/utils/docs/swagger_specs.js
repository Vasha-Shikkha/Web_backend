const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
	swaggerDefinition: {
		info: {
			title: 'VashaShikkha',
			version: '1.0.0',
			description: 'API documentation of VashaShikkha',
			license: {
				name: 'MIT',
				url: 'https://choosealicense.com/licenses/mit/',
			},
			contact: {
				name: 'Waqar Hassan Khan',
				url: '',
				email: 'waqar.hassan866@gmail.com',
			},
		},

		components: {
			securitySchemes: {
				bearerAuth: {
					description:
						'Run the /user/login api, and cop the JWT token from the response',
					type: 'apiKey',
					name: 'Authorization',
					in: 'header',
				},
			},
		},
		openapi: '3.0.0',
		servers: [
			{ url: 'http://localhost:4000' },
			{
				url: 'http://ec2-18-140-84-3.ap-southeast-1.compute.amazonaws.com:5000',
			},
		],
		responses: {
			UnauthorizedError: {
				description: 'Access token is missing or invalid',
			},
		},

		paths: {},
		definitions: {},
		responses: {},
		parameters: {},
	},
	apis: ['./src/models/*.js'],
	explorer: true,
};

const swaggerDocs = swaggerJSDoc(options);

const setSwagger = (app) => {
	app.use(
		'/api-docs',
		swaggerUi.serve,
		swaggerUi.setup(swaggerDocs, {
			explorer: true,
		})
	);
};

module.exports = setSwagger;
