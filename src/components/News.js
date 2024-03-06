import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
   static defaultProps = {
    country: 'in',
    category: 'general',
    pageSize: 20
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number
  };


    articles= [];
    constructor(){
        super();
        console.log("COnstructor");
        this.state={
            articles:this.articles,
            loading:false,
            page:1,
            totalResults:0
        }
    }

    async updateNews(){
      this.props.setProgress(10);
      const endPoint=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      //const endPoint=`https://news.google.com/rss/search?q=apple&hl=en-IN&gl=IN&ceid=IN:en`;
        this.setState({loading:true});
        let data= await fetch(endPoint);
        this.props.setProgress(30);
        let parseData=  await data.json();
        this.props.setProgress(60);
        //console.log(parseData);
        this.setState({
            articles:parseData.articles,
            loading:false,
            totalResults:parseData.totalResults
        })
        this.props.setProgress(100);
    }

    async componentDidMount(){
      this.setState({page:this.state.page })
       this.updateNews();
      
    }


     prevClick = async ()=>{
      this.setState({page:this.state.page-1 })
      //this.updateNews();
    }

     nextClick = async ()=>{
     if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      this.setState({page:this.state.page+1 })
      //this.updateNews();
     }
      
    }

    fetchMoreData = async ()=>{
      this.setState({page:this.state.page+1 })
      const endPoint=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        //this.setState({loading:true});
        let data= await fetch(endPoint);
        let parseData=  await data.json();
        //console.log(parseData);
        this.setState({
            articles:this.state.articles.concat(parseData.articles),
            loading:false,
            totalResults:parseData.totalResults
        })
    }

  render() {
    return (
      <div>
          <>
          <div className="container my-2">          <h3>{this.props.category} Headlines</h3>

</div>  
              {/* {this.state.loading && <Spinner/>} */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container my-3">
          <div className="row">
              {!this.state.loading && this.state.articles.map((element)=>{
                  return <div key={element.url} className="col-md-4 my-2">
                  <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                  </div>
              })}
              
          </div>
          </div>
          </InfiniteScroll>
          {/* <div className="d-flex justify-content-between">
  <button disabled={this.state.page===1} className="btn btn-dark" type="button" onClick={this.prevClick}>&#8249; Previous </button>
  <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" type="button" onClick={this.nextClick}>Next &#8250;</button>
</div> */}
        </>
      </div>
    )
  }
}

export default News
