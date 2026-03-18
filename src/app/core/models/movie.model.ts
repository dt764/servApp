export interface OMDbMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}
export interface OMDbSearchApiResponse {
  Search: OMDbMovie[];
  totalResults: string;
  Response: string;
}