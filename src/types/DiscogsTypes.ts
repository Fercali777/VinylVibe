export interface Disco {
    id: number;
    title: string;
    cover_image: string;
    format: string[];
    release_id: string;
  };
  
  export interface Genero {
    id: number;
    name: string;
  };

  export type User = {
userName: string;
email: string;

  };