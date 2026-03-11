export interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface CreateAddressData {
  name: string;
  details: string;
  phone: string;
  city: string;
}

