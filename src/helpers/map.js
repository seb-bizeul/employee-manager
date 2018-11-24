// @flow
export type Map<A> = $ReadOnly<{ [string]: A }>

export const toArray = <A>(map: Map<A>): A[] => {
  return Object.keys(map).map(key => map[key])
}
