// define wich auth types are supported
export enum AuthType {
  Bearer, // auth via JWT (access token)
  // ApiKey,
  None, // no auth (ex public endpoint)
  Refresh,
}
