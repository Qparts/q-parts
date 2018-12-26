import React from 'react'
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    // this.props.history.push(`search-key=${this.state.searchText}`);
    //  this.props.history.push({
    //   pathname: '/search',
    //   search: `search-key:${this.state.searchText}`,
    //   state: { query: this.state.searchText }
    // })

    this.props.history.push(`/listing?search-key=${this.state.searchText}`);
    this.props.toggle();

  }
  onChangeSearch = e => {
    this.setState({ searchText: e.target.value })
  }

  render() {
    return (
      <section id="Search">
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <input type="text" class="form-control mb-2 col-11" id="inlineFormInput" placeholder="Search By Part Name, Part Number, Product Name" onChange={this.onChangeSearch} required />
            <div className="col-1">
              <button type="submit" className="btn btn-primary mb-2"><i className="icon-search"></i></button>
            </div>
          </div>
        </form>
      </section>
    )
  }
}


const withSearch = withRouter(Search)

export default (withSearch);
//path for SearchResult Component
// {
//   path: "/search?search-key:value",
//   component: SearchResult
// }
