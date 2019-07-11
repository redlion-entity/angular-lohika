export type Task = {
  id: string,
  description: string,
  done?: boolean,
};

export type Tasks = {
  [id: number]: Task
};
