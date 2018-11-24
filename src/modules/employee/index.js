// @flow
import reducer, { initialState } from './reducer'
import * as actions from './actions'
import * as saga from './saga'
import Employees from './components/Employees'
import EmployeesContainer from './containers/EmployeesContainer'

export default {
  reducer,
  initialState,
  actions,
  saga,
  components: {
    Employees,
    EmployeesContainer
  }
}
