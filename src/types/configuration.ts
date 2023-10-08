export interface IDatabaseConfig {
  readonly mongoURI: string;
};

export interface IServerConfig {
  readonly port: number;
  readonly logFormat: string;
};

export interface IAppConfig {
  readonly database: IDatabaseConfig;
  readonly server: IServerConfig;
};
