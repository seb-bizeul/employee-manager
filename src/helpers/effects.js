// @flow
import { maybe, type Maybe } from '@sbizeul/fp-flow'

const getElementById = (document: any) => (id: string): Maybe<HTMLElement> => {
  return maybe.fromNullable(document.getElementById(id))
}

export default {
  getElementById: getElementById(window.document)
}
