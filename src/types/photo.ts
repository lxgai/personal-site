export interface Photo {
  id: string;
  url: string;
  thumbnail: string;
  location: {
    name: string;
    coordinates: [number, number];
  };
  caption?: string;
  date?: string;
}

export interface SanityPhoto {
  _id: string;
  title: string;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  location: {
    lat: number;
    lng: number;
  };
  locationName: string;
  caption?: string;
  date?: string;
}