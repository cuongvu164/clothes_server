import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { Response } from "./response";

export class UsersResponse implements Response {
  success: boolean;
  errorMessage: string;
  users?: OkPacket | RowDataPacket[] | RowDataPacket[][] | OkPacket[] | ResultSetHeader;
  accessToken?: string;
}
