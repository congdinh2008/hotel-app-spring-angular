export class SearchResponse<T> {
  public data: T[] = [];
  public page!: PageInfo;
  public links: Link[] = [];
}

export class PageInfo {
  public size!: number;
  public totalElements!: number;
  public totalPages!: number;
  public number!: number;
}

export class Link {
  public rel!: String;
  public href!: String;
}