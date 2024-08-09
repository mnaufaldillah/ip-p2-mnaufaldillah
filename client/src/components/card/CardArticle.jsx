import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

function CardArticle({dataDetail}) {
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
                </div>
            </div>
        </div>
    )
}

CardArticle.propTypes ={
    dataDetail: PropTypes.object
}

export default CardArticle;