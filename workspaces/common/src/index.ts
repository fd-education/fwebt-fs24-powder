export type ScoreResponse = {
  id: string,
  name: string,
  score: string,
  timestamp: string
};

export type ScoreRequest = {
  name: string,
  score: number,
  timestamp: string
};

export type ScoreboardResponse = {
  ranking: ScoreResponse[]
};