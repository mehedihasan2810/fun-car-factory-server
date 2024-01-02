/*
 * Prettify utility type to ensure readonly properties in the context.
 */
type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

/*
 * MyContext type representing the context object with optional authorization.
 */
export type MyContext = {
  authorization?: string;
};

/*
 * Car type representing the structure of a toy car.
 */
export type Car = Prettify<{
  id: string;
  category: string;
  description: string;
  email: string;
  name: string;
  price: number;
  quantity: number;
  rating: number;
  sellerName: string;
  url: string;
}>;

/*
 * CarInput type representing the input for creating or updating a toy car, omitting the 'id' property.
 */
export type CarInput = Omit<Car, "id">;

/*
 * Response type representing a generic response structure.
 */
type Response = {
  code: number;
  message: string;
  success: boolean;
};

/*
 * CreateCarResponse type representing the response structure when creating a toy car.
 */
export type CreateCarResponse = Prettify<
  Response & {
    // code: number;
    // message: string;
    // success: boolean;
    car: Car;
  }
>;

/*
 * User type representing the structure of a user.
 */
export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

/*
 * CreateUserResponse type representing the response structure when creating a user.
 */
export type CreateUserResponse = Prettify<
  Response & { token: string | null } & {
    user: User | null;
  }
>;

/*
 * UserInput type representing the input for creating a user, omitting the 'id' property.
 */
export type UserInput = Omit<User, "id">;
