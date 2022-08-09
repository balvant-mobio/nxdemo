export interface Todo {
  title: string;
}

export interface Profile {
  name: string;
  locations: Address[];
}

interface Address {
  city: string;
  state: string;
}
