"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("@nestjs/typeorm");
const _services_1 = require("@services");
function DatabaseModule() {
    const configService = new _services_1.ConfigService(`${process.env.NODE_ENV}.env`);
    return typeorm_1.TypeOrmModule.forRoot({
        type: 'mysql',
        host: configService.envConfig.DB_HOST,
        port: parseInt(configService.envConfig.DB_PORT, 10),
        username: configService.envConfig.DB_USERNAME,
        password: configService.envConfig.DB_PASSWORD,
        database: configService.envConfig.DB_DATABASE,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
    });
}
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.js.map