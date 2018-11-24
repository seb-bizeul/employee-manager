// @flow
import { fork, cancel } from 'redux-saga/effects'
import type { Saga } from 'redux-saga'

function* mocked() {
  yield cancel
}

export default function* root(): Saga<*> {
  yield fork(mocked)
}
