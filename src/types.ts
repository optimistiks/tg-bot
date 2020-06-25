export interface Score {
  messageId: number;
  authorId: number;
  scorerId: number;
  chatId: number;
}

export interface Total {
  authorId: number;
  chatId: number;
  score: number;
}
