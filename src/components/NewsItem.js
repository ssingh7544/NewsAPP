import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
      let {title, description, imgUrl, url, author, date, source}=this.props;
    return (
     
        <div className="card mx-2">
          <span className="position-absolute top-0 badge rounded-pill bg-danger">
    {source}
  </span>
  <img src={imgUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-muted">{!author?"Unknown":author} on {new Date(date).toGMTString()} </small></p>
    <a href={url} className="btn btn-sm btn-dark">Read</a>
  </div>
  
</div>
     
    )
  }
}

export default NewsItem
