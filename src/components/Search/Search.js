import React from 'react'
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      url: ''
    }
  }
  handleSubmit = values => {
   // this.props.history.push(`search-key=${this.state.searchText}`);
  //  this.props.history.push({
  //   pathname: '/search',
  //   search: `search-key:${this.state.searchText}`,
  //   state: { query: this.state.searchText }
  // })

  }
  onChangeSearch = e => {
    this.setState({
      searchText: e.target.value,
      url:`/search?search-key=${e.target.value}`
    })
  }

  render () {
    return (
      <section id="Search" className="container-fluid">
            <p> All auo parts in one place - choose yours among 1.000.000 of spare parts </p>
            <form>
              <div className="form-row align-items-center">
                <div className="col-10">
                  <input type="text" class="form-control mb-2 " id="inlineFormInput" placeholder="Search By Part Name, Part Number, Product Name" onChange={this.onChangeSearch} required/>
                </div>
                <div className="col-auto">
                  <Link to={this.state.url}><button type="submit" className="btn btn-primary mb-2"><i className="icon-search"></i></button></Link>
                </div>
              </div>
            </form>
      </section>
    )
  }
}


const withSearch= withRouter(Search)

export default (withSearch);
//path for SearchResult Component
// {
//   path: "/search?search-key:value",
//   component: SearchResult
// }
