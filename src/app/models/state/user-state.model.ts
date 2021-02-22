import {DeserializedJwtModel} from '../deserialized-jwt.model';

export interface UserStateModel {
  jwt: DeserializedJwtModel | {}
  name: string;
  id: string;
  role: string;
  exp: number;
  token: string;
}
