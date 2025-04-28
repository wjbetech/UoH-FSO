import diaries from "../../data/entries";
import { NonSensitiveDiaryEntry, Weather } from "../types/types";

import { DiaryEntry } from "../types/types";

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const isWeather = (param: string): param is Weather => {
  return Object.values(Weather).map(v => v.toString()).includes(param);
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({
    id, date, weather, visibility
  }) => ({
    id,
    date,
    weather, 
    visibility,
  }));
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  isWeather
};
