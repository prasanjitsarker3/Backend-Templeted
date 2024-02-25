export type TComment = {
  _id: string;
  comment: string;
  isDeleted: boolean;
};
export type TBlogPost = {
  postTime: Date;
  title: string;
  location: string;
  photo: string[];
  video: string;
  status: "pending" | "approved";
  date: Date;
  comment?: TComment[];
  like?: number;
  save?: string;
};
