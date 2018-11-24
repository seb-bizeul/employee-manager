// @flow
import reducer, { initialState } from './reducer'
import * as actions from './actions'
import * as saga from './saga'
import EmployeePage from './components/EmployeePage'
import Employees from './components/Employees'
import EmployeeForm from './components/EmployeeForm'
import EmployeePageContainer from './containers/EmployeePageContainer'
import EmployeeFormContainer from './containers/EmployeeFormContainer'

export default {
  reducer,
  initialState,
  actions,
  saga,
  components: {
    EmployeePage,
    Employees,
    EmployeePageContainer,
    EmployeeFormContainer,
    EmployeeForm
  }
}
