import { ITrack } from '@app/shared/common/model/ITrack';
import { ILevel } from '@app/shared/common/model/ILevel';

export interface IChallenge {
  title: string;
  description: string;
  start_date: string | Date;
  end_date: string | Date;
  challengeImage: string;
  uid?: string;
}

export interface IChallengeConfig {
  trackIds: Array<number>;
  levelIds: Array<number>;
  challengeId: string;
}

export interface IChallengeList extends IChallenge{
  uid: string;
  tasks_count: number;
  created_at: string;
  status: string;
  timeline: number;
  participants_count: number;
}

export interface IChallengeFormDetail extends IChallenge{
  uid: string;
  tracks: ITrack[];
  levels: ILevel[];
  timeline: number;
}

