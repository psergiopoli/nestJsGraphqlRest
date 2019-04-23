export function EnvString(envProperty: string, defaultValue: string) {
    return (target, key?: string): any => {
        target[key] = (): string => process.env[envProperty] || defaultValue;
    };
}

export function EnvNumber(envProperty: string, defaultValue: number) {
    return (target, key?: string): any => {
        target[key] = (): number => process.env[envProperty] ? parseInt(process.env[envProperty], 10) : defaultValue;
    };
}

export class Env{

    @EnvString('NODE_ENV', 'development')
    public static env: () => string;

    @EnvNumber('PORT', 3000)
    public static port: () => number;

    @EnvString('DB_USERNAME', 'root')
    public static dbUsername: () => string;

    @EnvString('DB_PASSWORD', 'root')
    public static dbPassword: () => string;

    @EnvString('DB_DATABASE', 'graphql_nest')
    public static dbDatabase: () => string;

    @EnvString('DB_HOST', 'localhost')
    public static dbHost: () => string;

    @EnvNumber('DB_PORT', 3306)
    public static dbPort: () => number;

    @EnvString('JWT_SECRET', 'hVDb7D33wwHfgxtDpZtI5fCMsDYjEfe6')
    public static jwtSecret: () => string;

}