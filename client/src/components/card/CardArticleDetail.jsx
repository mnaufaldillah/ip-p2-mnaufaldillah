import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addBookmark, deleteBookmark } from '../../app/bookmarkListSlice';

function CardArticleDetail({dataDetail, userBookmark}) {
    // console.log(dataDetail, `<--------------- Data Detail`);
    const dispatch = useDispatch();

    function handlerAddBookmark() {
        dispatch(addBookmark(dataDetail.articleId));
    }

    function handlerDeleteBookmark() {
        dispatch(deleteBookmark(dataDetail.articleId));
    }

    function renderBookmarkButton() {

        for (const item of userBookmark) {
            if(item.ArticleId === dataDetail.articleId) {
                return (
                    <button onClick={handlerDeleteBookmark}  className="btn btn-outline-danger btn-sm" key={dataDetail.articleId}>
                        Delete Bookmark
                    </button>
                )
            }
        }

        return (
            <button onClick={handlerAddBookmark} className="btn btn-primary btn-sm">
                Bookmark This
            </button>
        )
    }
    
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

                    {renderBookmarkButton()}
                </div>
            </div>
        </div>
    )
}

CardArticleDetail.propTypes ={
    dataDetail: PropTypes.object,
    userBookmark: PropTypes.array
}

export default CardArticleDetail;