import {Specification} from './specification';

export interface Category {
  id: number;
  name: string;
  specifications: Specification[];
  childrenCategories: Category[];
}
