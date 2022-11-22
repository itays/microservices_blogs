export type Post = {
  id: string;
  title: string;
  comments: Comment[];
};

export type Comment = {
  id: string;
  content: string;
  status: "pending" | "rejected" | "approved";
};
