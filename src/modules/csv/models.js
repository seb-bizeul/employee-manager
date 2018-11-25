// @flow
export const checkColumns = (columns: string[]) => {
  return (
    columns[0] !== 'first_name' ||
    columns[1] !== 'last_name' ||
    columns[2] !== 'gender' ||
    columns[3] !== 'email_address' ||
    columns[4] !== 'phone_number'
  )
}
