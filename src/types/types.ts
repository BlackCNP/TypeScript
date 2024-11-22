export type NullableHTMLElement = HTMLElement | null;

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}