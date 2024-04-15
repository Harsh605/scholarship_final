import React from 'react'
import New_collection from '../Components/New_Collection'
// import "../component/Header.css";
// import "../generosity/css/less/layout.less"
// import "../generosity/css/less/reset.less"
// import "../generosity/css/less/mixins.less"
// import "../generosity/css/less/variables.less"
// import "../generosity/css/venobox.css"
// import "../generosity/css/animate.css"
// import "../generosity/css/font-awesome.min.css"
// import "../generosity/css/styles.css"

const BlogId = () => {
  return (
    <div>
      
      <section className="page-header" data-stellar-background-ratio="0.1" style={{backgroundPosition: '50% 50%'}}>
  <div className="container">
    <div className="row">
      <div className="col-sm-12 text-center">
        <h3>
          Blog single post
        </h3>
        <p className="page-breadcrumb">
          <a href="#">Home</a>
          / Blog
          <a href="#">single post</a>
           
        </p>
      </div>
    </div>
    {/* end .row  */}
  </div>
  {/* end .container  */}
</section>



<section className="section-content-block">
  <div className="container">
    <div className="row">
      <div className="col-md-8 col-sm-12">
       
       {New_collection.map((item,index)=>{
        return(
        <article className="post single-post-inner">
          <div className="post-inner-featured-content">
            <img key={index} alt src={item.Image} />
          </div>
          <div className="single-post-inner-title">
            <h2>{item.heading}</h2>
            <p className="single-post-meta">
              <i className="fa fa-user" />&nbsp; Deborah Beck &nbsp; &nbsp;
              <i className="fa fa-share" />&nbsp;{item.category}</p>
          </div>
          <div className="single-post-inner-content">
             
            <p>
              {item.description}
            </p>
          </div>
          <div className="single-post-inner-meta">
            <div className="tag-list">
              <a href>Help</a>
              <a href>Repair</a>
              <a href>Happy</a>
              <a href>People</a>
            </div>
          </div>
        </article>

)
})}
        {/*  end single-post-container */}
        <div className="article-author clearfix">
          <div className="topic-bold-header clearfix">
            <h4>Article by
              <a href>Deborah Beck</a>
            </h4>
          </div>
          {/* end .topic-bold-header  */}
          <figure className="author-avatar">
            <a href="">
              <img src="/public/28.jpg" alt="Avatar" />
            </a>
          </figure>
          <div className="about_author">
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam feugiat vitae ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
          </div>
          <div className="social-icons margin-top-11 clearfix">
            <a className="fa fa-facebook social_icons" href="#" data-original-title="Facebook" />
            <a className="fa fa-twitter social_icons" href="https://twitter.com/#" data-original-title="Twitter" />
            <a className="fa fa-flickr social_icons" href="http://www.flickr.com/photos/#" data-original-title="Flickr" />
            <a className="fa fa-youtube social_icons" href="http://www.youtube.com/#" data-original-title="Youtube" />
            <a className="fa fa-linkedin social_icons" href="#" data-original-title="Linkedin" />
          </div>
        </div>
        {/* end .article-author  */}
        <div className="post-nav-section clearfix">
          <a className="btn btn-primary fr" href="#">Next Post
            <i className="fa fa-angle-double-right" />
          </a>
          <a className="btn btn-primary" href="#">
            <i className="fa fa-angle-double-left" />
            Previous Post</a>
        </div>
        {/* end .post-nav-section  */}
        <div className="related-post">
          <div className="topic-bold-header clearfix">
            <h4>Related Posts</h4>
          </div>
          {/* end .topic-bold-header  */}
          <ul>
            <li><a href="#">- Make Kalam's House A Knowledge Centre</a></li>
            <li><a href="#">- TRAI Pledges to Protect Net Neutrality</a></li>
            <li><a href="#">-  Improve Safety Measures For Women Passengers</a></li>
          </ul>
        </div>
        {/* end .related-post  */}
        <div className="comments-area" id="comments">
          <a href="#respond" className="article-add-comments">
            <i className="fa fa-plus" />
          </a>
          <div className="topic-bold-header clearfix">
            <h4>4 comments to this article</h4>
          </div>
          {/* end .topic-bold-header  */}
          <ol className="commentslist">
            <li>
              <article className="clearfix">
                <header>
                  <h5>
                    <a href>Mahbub Alam Khan</a>
                  </h5>
                  <p>
                    <span>on jan 19th, 2013 at 3:05 Pm -
                    </span>
                    <a href>Reply</a>
                  </p>
                </header>
                <figure className="comment-avatar">
                  <a href>
                    <img src="../../public/29.webp" alt="Avatar" />
                  </a>
                </figure>
                <p className="waiting-moderation">
                  Your comment is awaiting for moderation.
                </p>
                <div className="comment_text">
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                </div>
              </article>
            </li>
            <li>
              <article className="clearfix">
                <header>
                  <h5>
                    <span>ADMIN</span>
                    <a href>Mahbub Alam Khan</a>
                  </h5>
                  <p>
                    <span>on jan 19th, 2013 at 3:05 Pm -
                    </span>
                    <a href>Reply</a>
                  </p>
                </header>
                <figure className="comment-avatar">
                  <a href>
                    <img src="../../public/30.webp" alt="Avatar" />
                  </a>
                </figure>
                <p className="waiting-moderation">
                  Your comment is awaiting for moderation.
                </p>
                <div className="comment_text">
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                </div>
              </article>
              <ol>
                <li>
                  <article className="clearfix">
                    <header>
                      <h5>Mahbub Alam Khan</h5>
                      <p>
                        <span>on jan 19th, 2013 at 3:05 Pm -
                        </span>
                        <a href>Reply</a>
                      </p>
                    </header>
                    <figure className="comment-avatar">
                      <a href>
                        <img src="../../public/31.webp" alt="Avatar" />
                      </a>
                    </figure>
                    <div className="comment_text">
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    </div>
                  </article>
                </li>
              </ol>
            </li>
            <li>
              <article className="clearfix">
                <header>
                  <h5>
                    <a href>Mahbub Alam Khan</a>
                  </h5>
                  <p>
                    <span>on jan 19th, 2013 at 3:05 Pm -
                    </span>
                    <a href>Reply</a>
                  </p>
                </header>
                <figure className="comment-avatar">
                  <a href>
                    <img src="../../public/32.webp" alt="Avatar" />
                  </a>
                </figure>
                <p className="waiting-moderation">
                  Your comment is awaiting for moderation.
                </p>
                <div className="comment_text">
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                </div>
              </article>
            </li>
          </ol>
          
          {/* end comments-nav-section*/}
          <div id="respond">
            <div className="topic-bold-header clearfix">
              <h4>Leave a reply</h4>
            </div>
            {/* end .topic-bold-header  */}
            <form role="form" action method="post" id="comment-form">
              <div className="form-group">
                <input type="text" className="form-control" id="author" placeholder="Name" />
              </div>
              <div className="form-group">
                <input type="email" className="form-control" id="email" placeholder="Email" />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" id="url" placeholder="URL" />
              </div>
              <div className="form-group">
                <textarea className="form-control" rows={5} name="comment" id="comment" placeholder="Write Your Comment" defaultValue={""} />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-custom">Submit Comment</button>
              </div>
            </form>
          </div>
          {/* end respond*/}
        </div>
        {/* end comments-area*/}
      </div>
      {/*  end .single-post-container */}
      <div className="col-md-4 col-sm-12">
        <div className="widget site-sidebar">
          <h2 className="widget-title">Search</h2>
          <form action="index.html" id="search-form" className="search-form" role="form" method="get">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search...." />
              <span className="input-group-addon">
                <i className="fa fa-search" />
              </span>
            </div>
            <input type="hidden" defaultValue="submit" />
          </form>
          {/* end #search-form  */}
        </div>
        {/*  end .widget */}
        <div className="widget site-sidebar">
          <h2 className="widget-title">Categories</h2>
          <ul className="widget-post-category clearfix">
            <li>
              <a title="View all posts filed under Environment" href="#">Child Education</a>
              <span className="pull-right badge">42</span>
            </li>
            <li>
              <a title="View all posts filed under Technology" href="#">Happy Family</a>
              <span className="pull-right badge">40</span>
            </li>
            <li>
              <a title="View all posts filed under Health" href="#">Helpless Shelter</a>
              <span className="pull-right badge">32</span>
            </li>
            <li>
              <a title="View all posts filed under Disaster" href="#">Fundraising
              </a>
              <span className="pull-right badge">26</span>
            </li>
            <li>
              <a title="View all posts filed under Environment Right" href="#">Direct Donation</a>
              <span className="pull-right badge">18</span>
            </li>
            <li>
              <a title="View all posts filed under Education" href="#">Join Now</a>
              <span className="pull-right badge">12</span>
            </li>
          </ul>
        </div>
        {/*  end .widget */}
        <div className="widget site-sidebar">
          <h2 className="widget-title">Recent Posts</h2>
          <div className="single-recent-post">
            <a href="#">Zomato Commits to Making Food Delivery</a>
            <span>
              <i className="fa fa-calendar" />&nbsp; April 19, 2017</span>
          </div>
          <div className="single-recent-post">
            <a href="#">Make Kalam's House A Knowledge Centre</a>
            <span>
              <i className="fa fa-calendar" />&nbsp; April 18, 2017</span>
          </div>
          <div className="single-recent-post">
            <a href="#">Central Government Retracts Proposal</a>
            <span>
              <i className="fa fa-calendar" />&nbsp; April 17, 2017</span>
          </div>
        </div>
        {/*  end .widget */}
        <div className="widget site-sidebar">
          <h2 className="widget-title">Tags</h2>
          <ul className="widget-recent-tags clearfix">
            <li>
              <a href title>
                claycold</a>
            </li>
            <li>
              <a href title>
                crushing</a>
            </li>
            <li>
              <a href title>
                chattels</a>
            </li>
            <li>
              <a href title>
                dinarchy</a>
            </li>
            <li>
              <a href title>
                cienaga</a>
            </li>
            <li>
              <a href title>
                doolie</a>
            </li>
          </ul>
          {/*  end .widget-recent-tags */}
        </div>
        {/*  end .widget */}
      </div>
      {/* end .col-sm-4  */}
    </div>
    {/*  end row  */}
  </div>
  {/*  end container */}
</section>







    </div>
  )
}

export default BlogId
