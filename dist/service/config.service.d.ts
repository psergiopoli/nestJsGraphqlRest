export interface EnvConfig {
    [key: string]: string;
}
export declare class ConfigService {
    readonly envConfig: EnvConfig;
    constructor(filePath: string);
    private validateInput;
}
