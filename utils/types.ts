export interface User {
  uid: number;
  email: string;
  username: string;
  nickname: string;
  picture: string;
  createdAt: Date;
}

export interface Snippet {
  sid: number;
  title: string;
  totalFiles: number;
  totalLikes: number;
  createdAt: Date;
  
  user: User;
  files: File[];
  likes: SnippetLike[];
}

export interface File {
  filename: string;
  code: string;
  language: string;
}

export interface SnippetLike {
  sid: number;
  uid: number;
  reaction: string;
}

