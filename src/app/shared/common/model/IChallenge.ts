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
  image_url: string;
  description: string;
}

export interface IChallengeFormDetail extends IChallenge{
  uid: string;
  tracks: ITrack[];
  levels: ILevel[];
  timeline: number;
}

export interface IChallengeDetail extends IChallengeFormDetail{
  image_url: string;
  participants: IParticipants;
  link: string;
  tasks_count: number;
  created_at: string | Date;
  hasRegistered: boolean;
}

export interface IParticipants {
  Male: number;
  Female: number;
}
export interface IJoinChallenge {
  trackId: number;
  levelId: number;
  challengeId: string;
}

