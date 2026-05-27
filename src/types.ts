export interface Keyword {
  name: string;
  createdAt: string;
  lastUpdateAt: string;
  lists: {
    accepted: string[];
    denied: string[];
  };
}

export type Lists = Keyword["lists"];

export type Search = {
  name: Keyword["name"];
  limit?: number;
  skip?: number;
};

export type ResponseData = {
  results: Keyword[];
  count: number;
  message?: string;
};
