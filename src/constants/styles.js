export const styles = {
 cursor: {
  cursor: 'pointer'
 },
 rightSpace: {
  margin: '0em 0em 0em 1em'
 },
 grey: {
  backgroundColor: '#f8f9fa'
 },
 show: {
  display: 'inline'
 },
 hide: {
  display: 'none'
 },
 white: {
  backgroundColor: 'white'
 },
 listingPage: {
  searchResult: {
   borderStyle: 'solid',
   borderWidth: 'thin'
  }
 },
 select : {
    container: () => ({
      width: 'auto !important',
      marginTop: '-4px',
      fontWeight: '700'
    }),
    menuList: () => ({
      padding: '5px 10px',
      fontSize: '12px',
      borderBottom: '1px solid $light-gray',
      minWidth: '100px',
      overflow: 'hidden',
      borderWidth: '0'
    }),
    singleValue: () => ({
      'borderWidth': '0',
      fontSize: '12px',
      padding: '0 0 0 5px',
      display: 'inline-block !important',
      borderRadius: '0'
    })
  }
}