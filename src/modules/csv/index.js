// @flow
import * as actions from './actions'
import * as saga from './saga'
import CsvUpload from './components/CsvUpload'
import CsvUploadContainer from './containers/CsvUploadContainer'

export default {
  actions,
  saga,
  components: {
    CsvUpload,
    CsvUploadContainer
  }
}
