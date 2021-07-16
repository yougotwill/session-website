export type IFigureImage = {
  title: string | null;
  description: string | null;
  imageUrl: string;
};

export type IAuthor = {
  name: string;
  avatar?: IFigureImage;
  shortBio: string;
  email: string;
  // Eg. Marketing Researcher
  position: string | null;
  twitter: string | null;
  facebook: string | null;
  github: string | null;
};

export interface IPost {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  body: string; // should be Document type
  author?: IAuthor;
  publishedDate: string;
  featureImage?: IFigureImage;
  tags: Array<string>;
  slug: string;
}
