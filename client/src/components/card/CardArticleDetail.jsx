import PropTypes from 'prop-types';

function CardArticleDetail({dataDetail}) {
    // console.log(dataDetail, `<--------------- Data Detail`);
    
    return (
        <div className="mb-3">
            <div className="card bg-light">
                <img src={dataDetail.articleImageUrl} alt="Article Image" className="card-img-top" width="600" height="800" />

                <div className="card-body">
                    <h4>{dataDetail.articleTitle}</h4>
                    <h6>{dataDetail.articleDescription}</h6>

                    <p>{dataDetail.articlePubDate}</p>
                    <br />

                    <p>{dataDetail.summaryText}</p>
                    <br />
                    <p>Summary By Gemini AI</p>

                    <button className="btn btn-primary btn-sm">Bookmark This</button>
                </div>
            </div>
        </div>
    )
}

CardArticleDetail.propTypes ={
    dataDetail: PropTypes.object
}

export default CardArticleDetail;