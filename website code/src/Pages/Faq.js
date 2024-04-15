import React from 'react'
// import "../generosity/css/less/layout.less"
// import "../generosity/css/less/reset.less"
// import "../generosity/css/less/mixins.less"
// import "../generosity/css/less/variables.less"
// import "../generosity/css/venobox.css"
// import "../generosity/css/animate.css"
// import "../generosity/css/font-awesome.min.css"
// import "../generosity/css/styles.css"

const Faq = () => {
  return (
    <div>
      
      <section className="page-header" data-stellar-background-ratio="0.1" style={{backgroundPosition: '50% 50%'}}>
  <div className="container">
    <div className="row">
      <div className="col-sm-12 text-center">
        <h3>
          Faq
        </h3>
        <p className="page-breadcrumb">
          <a href="#">Home</a>
          /
          <a href="#">Faq</a>
           
        </p>
      </div>
    </div>
    {/* end .row  */}
  </div>
  {/* end .container  */}
</section>



<section className="section-content-block section-faq">
  <div className="container">
    <div className="row section-heading-wrapper">
      <div className="col-md-12 col-sm-12 text-center">
        <h2>F.A.Q</h2>
        <h4>The tender loving care of human beings will never become obsolete.</h4>
      </div>
      {/* end .col-sm-10  */}
    </div>
    {/*  end .row  */}
    <div className="row">
      <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12" id="accordion">
        <div className="panel panel-default faq-box">
          <div className="panel-heading">
            <p className="panel-title">
              <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">I am Minor. How can I apply for scholarship?</a>
            </p>
          </div>
          <div id="collapseOne" className="panel-collapse collapse">
            <div className="panel-body">
            Yes, you can apply for scholarship through your parents’ authentic login Id and password.
            </div>
          </div>
        </div>
        
        <div className="panel panel-default faq-box">
          <div className="panel-heading">
            <p className="panel-title">
              <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree">How much scholarship I can get?</a>
            </p>
          </div>
          <div id="collapseThree" className="panel-collapse collapse">
            <div className="panel-body">
            It depends on marks obtained by you in the last exam as well as yearly income of your parents. 
            </div>
          </div>
        </div>
       
      </div>
      {/* end .col-md-6  */}
      <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12" id="accordion2">
        
      <div className="panel panel-default faq-box">
          <div className="panel-heading">
            <p className="panel-title">
              <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I want to donate some amount to the Trust. Is it possible to donate online?</a>
            </p>
          </div>
          <div id="collapseTwo" className="panel-collapse collapse">
            <div className="panel-body">
            Yes, you can donate online using Internet banking using IMPS/NEFT/RTGS facility to the Trust accounts mentioned on the portal.
            </div>
          </div>
        </div>
        
        <div className="panel panel-default faq-box">
          <div className="panel-heading">
            <p className="panel-title">
              <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree">How much scholarship I can get?</a>
            </p>
          </div>
          <div id="collapseThree" className="panel-collapse collapse">
            <div className="panel-body">
            It depends on marks obtained by you in the last exam as well as yearly income of your parents. 
            </div>
          </div>
        </div>


        
      </div>
      {/* end .col-md-6  */}
    </div>
    {/* end .row  */}
  </div>
  {/* end .container  */}
</section>




    </div>
  )
}

export default Faq
