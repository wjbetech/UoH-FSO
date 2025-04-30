export interface CoursePartBasic {
  name: string;
  exerciseCount: number;
  description: string;
  kind: "basic";
}

export interface CoursePartWithGroups {
  name: string;
  exerciseCount: number;
  groupProjectCount: number;
  kind: "basic";
}

export interface CoursePartWithBackground {
  name: string;
  exerciseCount: number;
  description: string;
  backgroundMaterial: string;
  kind: "basic";
}
