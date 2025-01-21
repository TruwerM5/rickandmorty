export {};
declare global {
  type FetchData = {
    info: {
      count: number;
      pages: number;
      next: string;
      prev: null | string;
    };
    results: Character[];
    error?: string;
  };
  type Character = {
    id: number;
    name: string;
    status: string;
    gender: string;
    origin: {
      name: string;
      url: string;
    };
    location: {
      name: string;
      url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
    type?: string;
  };
}
