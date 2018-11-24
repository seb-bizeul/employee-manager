// @flow

export type ParseRequest = $ReadOnly<{|
  type: 'csv/PARSE_REQUEST',
  payload: File
|}>

export type ParseSuccess = $ReadOnly<{|
  type: 'csv/PARSE_SUCCESS',
  payload: mixed
|}>

export type ParseFailure = $ReadOnly<{|
  type: 'csv/PARSE_FAILURE',
  payload: any
|}>
