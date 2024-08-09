import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardArticle from "../components/card/CardArticle";
import Header from "../components/header/Header";
import { fetchArticles } from "../app/articleListSlice";

function ArticleList() {
    const articles = useSelector((state) => state.articleList.value);
    const loading = useSelector((state) => state.articleList.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchArticles());
    }, []);

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }

    // console.log(articles, `<--------------------- By Nau`);
    
    return (
        <div className="container">
            <Header title={`The Latest Sports News`} />

            <div className="mb-3 p-3 row d-flex justify-content-between">
                <div className="p-3 d-flex justify-content-center">

                </div>

                <div className="row p-3">
                    {articles.map((item) => {
                        return (
                            <CardArticle dataDetail={item} key={item.article_id} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ArticleList;