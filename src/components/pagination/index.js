import React from 'react'
import { Pagination } from 'react-bootstrap';

class Pager extends React.PureComponent {
  render(){
    let startFrom = Math.max(0, this.props.activePage-5), endTo = Math.min(this.props.numberOfPages, this.props.activePage+5);
    const { numberOfPages } = this.props;

    let items = [];
    if(numberOfPages > 10) {
      items.push(<Pagination.First key={-2} onClick={e => this.props.onChange(1)} />);
      items.push(<Pagination.Prev key={-1} onClick={e => this.props.onChange(Math.max(1, this.props.activePage - 10))} />);
    }
    for (let i = startFrom; i < endTo ; i++) {
      items.push(<Pagination.Item key={i} active={i+1 === this.props.activePage} onClick={e => this.props.onChange(i+1)}>{i+1}</Pagination.Item>);
    }
    if(numberOfPages > 10) {
      items.push(<Pagination.Next key={200000} onClick={e => this.props.onChange(Math.min(this.props.activePage + 10, numberOfPages))} />);
      items.push(<Pagination.Last key={200001} onClick={e => this.props.onChange(numberOfPages)} />);
    }

    return ( <div className="pagerBar"><Pagination bsSize="medium">{items}</Pagination></div>  );
  }
};

export default Pager;
