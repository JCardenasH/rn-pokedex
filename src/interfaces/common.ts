export interface ApiQueryParams {
  /**
   * Limit query parameter.
   *
   * Indicates the amount of resources that will be received in the request.
   */
  limit: number;

  /**
   * Offset query parameter.
   *
   * It can be used to move to the next page based.
   */
  offset: number;
}

export interface ApiQueryUrl {
  url: string;
}
