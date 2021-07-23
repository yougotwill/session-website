import { Document } from '@contentful/rich-text-types';

export interface IFetchBlogEntriesReturn {
  posts: Array<IPost>;
  total: number;
}

export type IFigureImage = {
  title: string | null;
  description: string | null;
  imageUrl: string;
  width: string | number;
  height: string | number;
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
  body: Document;
  author?: IAuthor;
  publishedDate: string;
  featureImage?: IFigureImage;
  fullHeader: boolean;
  tags: Array<string>;
  slug: string;
}
