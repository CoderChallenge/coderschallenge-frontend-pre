export interface ITask {
 title: string;
 description: string;
 forDay: number;
 attachment: string;
 point: number;
 track: number;
 level: number;
 challengeId: string;
}
export interface ITaskList {
 title: string;
 content: string;
 forDay: number;
 uid: string;
 point: number;
 trackName: string;
 levelName: string;
 isResource: boolean;
 challengeTitle: string;
 created_at: string | Date;
 submissions_count: number;
}
