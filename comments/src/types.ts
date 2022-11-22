export type Comment = {
  id: string;
  content: string;
  status: "pending" | "rejected" | "approved";
};
