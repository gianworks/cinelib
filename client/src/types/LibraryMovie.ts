export type LibraryMovie = {
  id: number;
  tmdb_id: number;
  watch_status: string;
  rating: number | null;
  notes: string | null;
  is_favorite: boolean;
  date_added: string;
};
