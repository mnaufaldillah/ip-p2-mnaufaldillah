import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteBookmark } from '../../app/bookmarkListSlice';
import { Link } from "react-router-dom";

function CardArticleBookmark({dataDetail}) {
    // console.log(dataDetail, `<--------------- Data Detail`);
    const dispatch = useDispatch();

    function handlerDeleteBookmark() {
        dispatch(deleteBookmark(dataDetail.articleId));
    }
    
    return (
        <div className="col-6 mb-3">
            <div className="card bg-light">
                <img src={dataDetail.image_url} alt="Article Image" className="card-img-top" width="300" height="400" />

                <div className="card-body">
                    <h5>{dataDetail.title}</h5>
                    <p>{dataDetail.description}</p>

                    <Link to={`/article/${dataDetail.article_id}`} >
                        <button className="btn btn-primary btn-sm">Get Summary</button>
                    </Link>

                    <button onClick={handlerDeleteBookmark}  className="btn btn-outline-danger btn-sm">
                        Delete Bookmark
                    </button>
                </div>
            </div>
        </div>
    )
}

CardArticleBookmark.propTypes ={
    dataDetail: PropTypes.object,
    userBookmark: PropTypes.array
}

export default CardArticleBookmark;