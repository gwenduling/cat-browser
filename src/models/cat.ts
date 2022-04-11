export interface Cat {
  id: string;
  url: string;
  breeds: {
    name: string;
    origin: string;
    temperament: string;
    description: string;
  }[]
}
