export type Weather = "sunny" | "rainy" | "cloudy" | "stormy" | "windy" | "snowy";

export type Visibility = "excellent" | "good" | "ok" | "poor" | "very poor";

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;

