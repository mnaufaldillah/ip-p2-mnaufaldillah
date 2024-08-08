import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/header/Header";
import { fetchArticleDetailyById } from "../app/articleDetailSlice";
import { useParams } from "react-router-dom";
import CardArticleDetail from "../components/card/CardArticleDetail";

function ArticleDetail() {
    const article = useSelector((state) => state.articleDetail.value);
    const loading = useSelector((state) => state.articleDetail.loading);
    const dispatch = useDispatch();
    const { ArticleId } = useParams();

    useEffect(() => {
        dispatch(fetchArticleDetailyById(ArticleId));
    }, []);

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }

    // console.log(article, `<------------- Article detail`);
    

    return (
        <div className="container">
            <Header title={`News Summary By Gemini AI`} />

            <div className="mb-3 p-3 row d-flex justify-content-between">
                <div className="p-3 d-flex justify-content-center">

                </div>

                <div className="row p-3">
                    <CardArticleDetail dataDetail={article} />
                </div>
            </div>
        </div>
    )
}

export default ArticleDetail;