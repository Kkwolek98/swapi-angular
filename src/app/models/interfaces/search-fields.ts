export interface DefaultSearchFields {
  name?: string;
}

export type StarshipsSearchFields = DefaultSearchFields | {
  model?: string
}