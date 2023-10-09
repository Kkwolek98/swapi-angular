export interface DefaultSearchFields {
  name?: string;
  search?: string;
}

export type StarshipsSearchFields = DefaultSearchFields | {
  model?: string;
}