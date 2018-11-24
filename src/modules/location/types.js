// @flow
export type LocationState = $ReadOnly<{|
  pathname: string,
  type: string,
  payload: Object,
  prev: {|
    +pathname: string,
    +type: string,
    +payload: Object,
  |},
  kind: string,
  routesMap: { [string]: string }
|}>
