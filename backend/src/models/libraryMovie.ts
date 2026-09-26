
export type LibraryMovie = {
  id: number;
  tmdb_id: number;
  watch_status: string;
  rating: number | null;
  notes: string | null;
  is_favorite: boolean;
  date_added: Date;
};

export type CreateLibraryMovie = {
  tmdb_id: number;
  watch_status: string;
  rating?: number | null;
  notes?: string | null;
  is_favorite?: boolean;
};

export type UpdateLibraryMovie = {
  watch_status?: string;
  rating?: number | null;
  notes?: string | null;
  is_favorite?: boolean;
};
