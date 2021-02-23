export interface DeserializedJwtModel {
  aud: string;
  exp: number;
  guest: boolean;
  id: string;
  iss: string;
  name: string;
  nbf: number;
  roles: { name: string };
  sub: string;
  token: string;
}
