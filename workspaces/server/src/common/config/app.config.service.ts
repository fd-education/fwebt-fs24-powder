import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { Injectable } from '@nestjs/common';
import { Stage } from '@powder/common';

@Injectable()
export class AppConfigService {
  private envConfig;

  constructor(filePath: string) {
    dotenv.config({ path: filePath });
    this.envConfig = this.validateEnv();
  }

  get appName(): string {
    return this.envConfig.APP_NAME;
  }

  get port(): number {
    return this.envConfig.PORT;
  }

  get mongoUri(): string {
    return this.isProd()
      ? this.envConfig.MONGO_URI
      : this.envConfig.MONGO_URI_DEV;
  }

  private isProd(): boolean {
    return this.stage() === Stage.PROD;
  }

  private stage(): Stage {
    return this.envConfig.STAGE as Stage;
  }

  private validateEnv() {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      APP_NAME: Joi.string().required(),
      STAGE: Joi.string()
        .required()
        .valid(...Object.values(Stage)),
      PORT: Joi.number().port().required(),

      MONGO_URI: Joi.string().required(),

      MONGO_URI_DEV: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      process.env,
      {
        allowUnknown: true,
      },
    );

    if (error) {
      throw new Error(`config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }
}
