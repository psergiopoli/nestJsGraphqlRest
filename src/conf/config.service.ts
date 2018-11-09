import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from 'joi';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  public readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'preprod'])
        .invalid('undefined')
        .default('development'),
      PORT: Joi.number().default(3000),
      DB_USERNAME: Joi.string().default('root'),
      DB_PASSWORD: Joi.string().default('root'),
      DB_DATABASE: Joi.string().default('graphql_nest'),
      DB_HOST: Joi.string().default('localhost'),
      JWT_SECRET: Joi.string().default('hVDb7D33wwHfgxtDpZtI5fCMsDYjEfe6'),
      DB_PORT: Joi.number().default(3306),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}