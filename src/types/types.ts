type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

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

export type CarInput = Omit<Car, "id">;

type Response = {
  code: number;
  message: string;
  success: boolean;
};

export type CreateCarResponse = Prettify<
  Response & {
    // code: number;
    // message: string;
    // success: boolean;
    car: Car;
  }
>;

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type CreateUserResponse = Prettify<
  Response & {
    user: User | null;
  }
>;

export type UserInput = Omit<User, "id">;
