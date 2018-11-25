// @flow
export type CsvError = $ReadOnly<{|
  code: string,
  message: string,
  row: number,
  type: string
|}>

export type ParseRequest = $ReadOnly<{|
  type: 'csv/PARSE_REQUEST',
  payload: File
|}>

export type ParseSuccess = $ReadOnly<{|
  type: 'csv/PARSE_SUCCESS',
  payload: any
|}>

export type ParseFailure = $ReadOnly<{|
  type: 'csv/PARSE_FAILURE',
  payload: any
|}>
