export type Meta = {
  title: string;
};

export type Frontmatter = {
  title: string;
  date: Date;
  description?: string;
  thumbnail?: string;
  links?: string[];
};
