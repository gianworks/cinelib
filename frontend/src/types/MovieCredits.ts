
type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

export type MovieCredits = {
cast: CastMember[];
  crew: {
    id: number;
    name: string;
    job: string;
  }[];
};
