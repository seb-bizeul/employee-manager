// @flow
import reducer, { initialState } from './reducer'
import * as actions from './actions'
import * as saga from './saga'
import EmployeePage from './components/EmployeePage'
import EmployeeTable from './components/EmployeeTable'
import EmployeeForm from './components/EmployeeForm'
import EmployeePageContainer from './containers/EmployeePageContainer'
import EmployeeFormContainer from './containers/EmployeeFormContainer'
import ErrorReportContainer from './containers/ErrorReportContainer'

export default {
  reducer,
  initialState,
  actions,
  saga,
  components: {
    EmployeePage,
    EmployeeTable,
    EmployeePageContainer,
    EmployeeFormContainer,
    EmployeeForm,
    ErrorReportContainer
  }
}
