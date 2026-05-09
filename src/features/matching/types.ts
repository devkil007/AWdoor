export type MatchStatus = "waiting" | "matched" | "expired";

export interface MatchRequest {
  id: string;
  userId: string;
  displayName: string;
  interests: string[];
  status: MatchStatus;
  createdAt: string;
}

export interface VideoRoom {
  id: string;
  participantIds: string[];
  matchRequestIds: string[];
  createdAt: string;
}
