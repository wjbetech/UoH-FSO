export enum Weather { 
  Sunny = "sunny", 
  Rainy = "rainy", 
  Cloudy =  "cloudy", 
  Stormy = "stormy",
  Windy = "windy",
  Snowy = "snowy" 
}

export enum Visibility {
  Excellent = "excellent",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
  VeryPoor = "very poor"
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;

