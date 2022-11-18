import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps={
    country:"in",
    PageSize:6,
    category:"general"
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }
  constructor(){
    super();
    console.log("this is constructor");
    this.state={
      articles:[],
      page:1,
      loading:false,
    }
  }
  async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=748f440e79c3404b80c7f696c775fea3&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data=await fetch(url);
    let parseData=await data.json();
    this.setState({
      articles:parseData.articles,
      totalResults:parseData.totalResults,
      loading:false,
    })
  }
  HandelePrev=async()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=748f440e79c3404b80c7f696c775fea3&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data=await fetch(url);
    let parseData=await data.json();
    this.setState({
      page:this.state.page-1,
      articles:parseData.articles,
      loading:false,

    })
  }
  HandleNext=async()=>{
    console.log("click on next");
    if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=748f440e79c3404b80c7f696c775fea3&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    let parseData=await data.json();
    this.setState({
      page:this.state.page+1,
      articles:parseData.articles,
      loading:false
    })
  }
  }
  render() {
    return (
      <div className="container p-5">
        <h1 className='text-center'>Top Headlines of Today</h1>
        {this.state.loading &&<Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url} >
              <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} url={element.url}/>
            </div>
          })
          }
        </div>
        <div className="contanier d-flex justify-content-between mt-2">
        <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.HandelePrev}>Previous &larr;</button>
        <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.HandleNext}>Next &rarr;</button>
        </div>
    </div>
    )
  }
}

export default News