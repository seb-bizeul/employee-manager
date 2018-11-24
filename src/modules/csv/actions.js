// @flow
export const PARSE_REQUEST = 'csv/PARSE_REQUEST'
export const PARSE_SUCCESS = 'csv/PARSE_SUCCESS'
export const PARSE_FAILURE = 'csv/PARSE_FAILURE'

export const parse = (csvFile: File) => ({
  type: PARSE_REQUEST,
  payload: csvFile
})

export const parseSuccess = <A>(results: A) => ({
  type: PARSE_SUCCESS,
  payload: results
})

export const parseFailure = (failure: any) => ({
  type: PARSE_FAILURE,
  payload: failure
})
