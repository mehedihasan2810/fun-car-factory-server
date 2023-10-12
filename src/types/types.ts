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

export type CreateCarResponse = {
  code: number;
  message: string;
  success: boolean;
  car: Car;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type UserInput = Omit<User, "id">;
