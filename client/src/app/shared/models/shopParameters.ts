import {Specification} from './specification';

export interface ShopParameters{
  categoryName? : string,
  filters?: {filter: Specification, selectedValues: string[]} [],
  selectedSort?: {sortBy: string, sortDirection: string},
  paginationParams: {pageSize: number, pageNumber: number},
  searchPhrase?: string
}
