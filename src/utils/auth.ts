import { Users } from "src/types/users";
import { sign, Secret } from "jsonwebtoken";
export const createToken = (user: Users): string => {
  return sign(
    {
      userId: user.username,
    },
    process.env.ACCESS_TOKEN_SECRET as Secret,
    {
      expiresIn: "1h",
    }
  );
};
