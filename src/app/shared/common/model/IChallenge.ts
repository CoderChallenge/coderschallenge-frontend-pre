export interface IChallenge {
  title: string;
  description: string;
  start_date: string | Date;
  end_date: string | Date;
  challengeImage: string;
}

export interface IChallengeConfig {
  trackIds: Array<number>;
  levelIds: Array<number>;
  challengeId: string;
}

