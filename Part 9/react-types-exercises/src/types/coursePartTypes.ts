export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  kind: string;
}

export interface CourseDescriptor extends CoursePartBase {
  description: string;
}

export interface CoursePartBasic extends CoursePartBase, CourseDescriptor {
  kind: "basic";
}

export interface CoursePartWithGroups extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

export interface CoursePartWithBackground extends CoursePartBase, CourseDescriptor {
  backgroundMaterial: string;
  kind: "background";
}

export interface CoursePartWithSpecial extends CoursePartBase, CourseDescriptor {
  requirements: string[];
  kind: "special";
}

export type CoursePartUnion = CoursePartBasic | CoursePartWithBackground | CoursePartWithGroups | CoursePartWithSpecial;
