export type Panel = "address" | "email" | "phone" | null;
export interface Location {
  id: number;
  state: string;
  city: string;
  address: string;
  lat: number;
  lng: number;
}

export const LOCATIONS: Location[] = [
  {
    id: 1,
    state: "West Bengal",
    city: "Kolkata",
    address: "6A Janak Rd, Opposite Lake Market, Kalighat, Kolkata 700029",
    lat: 22.516429,
    lng: 88.348355,
  },
  {
    id: 2,
    state: "Karnataka",
    city: "Bengaluru",
    address: "Bengaluru Office",
    lat: 12.964982,
    lng: 77.614963,
  },
  {
    id: 3,
    state: "Assam",
    city: "Guwahati",
    address: "30 M. Ahmed Road, Rehabari, Guwahati, Assam 781008",
    lat: 26.173736,
    lng: 91.750856,
  },
  {
    id: 4,
    state: "Bihar",
    city: "Patna",
    address: "Anupma House Apartment, Patliputra, Patna, Bihar",
    lat: 25.6251803,
    lng: 85.1080785,
  },
  {
    id: 5,
    state: "Odisha",
    city: "Bhubaneswar",
    address: "Puri-Cuttack Road, Laxmisagar, Bhubaneswar 751006",
    lat: 20.268402,
    lng: 85.848254,
  },
  {
    id: 6,
    state: "Jharkhand",
    city: "Ranchi",
    address: "Ranchi Office",
    lat: 23.396207,
    lng: 85.344595,
  },
  {
    id: 7,
    state: "Uttar Pradesh",
    city: "Lucknow",
    address: "1/210 Virat Khand, Gomti Nagar, Lucknow 226010",
    lat: 26.851821,
    lng: 81.020259,
  },
  {
    id: 8,
    state: "Tamil Nadu",
    city: "Chennai",
    address:
      "Sabapathy Cross St, Kuppusamy Nagar, Annanagar East, Chennai 600102",
    lat: 13.093143,
    lng: 80.231039,
  },
];
