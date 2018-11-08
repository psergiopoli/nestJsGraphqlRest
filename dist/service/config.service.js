"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const fs = require("fs");
const Joi = require("joi");
class ConfigService {
    constructor(filePath) {
        const config = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = this.validateInput(config);
    }
    validateInput(envConfig) {
        const envVarsSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid(['development', 'production', 'test', 'preprod'])
                .invalid('undefined')
                .default('development'),
            PORT: Joi.number().default(3000),
            DB_USERNAME: Joi.string().default('root'),
            DB_PASSWORD: Joi.string().default('root'),
            DB_DATABASE: Joi.string().default('graphql_nest'),
            DB_HOST: Joi.string().default('localhost'),
            DB_PORT: Joi.number().default(3306),
        });
        const { error, value: validatedEnvConfig } = Joi.validate(envConfig, envVarsSchema);
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map