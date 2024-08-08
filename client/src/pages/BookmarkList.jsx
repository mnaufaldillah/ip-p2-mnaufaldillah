import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBookmarks, fetchBookmarksForUser } from "../app/bookmarkListSlice";
import CardArticleBookmark from "../components/card/CardArticleBookmark";
import Header from "../components/header/Header";

function BookmarkList() {
    const bookmarkArticles = useSelector((state) => state.bookmarkList.value);
    const loading = useSelector((state) => state.articleList.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBookmarks());
        dispatch(fetchBookmarksForUser());
    }, []);

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }

    // console.log(articles, `<--------------------- By Nau`);
    
    return (
        <div className="container">
            <Header title={`Bookmarked News`} />

            <div className="mb-3 p-3 row d-flex justify-content-between">
                <div className="p-3 d-flex justify-content-center">

                </div>

                <div className="row p-3">
                    {bookmarkArticles.map((item) => {
                        return (
                            <CardArticleBookmark dataDetail={item} key={item.article_id} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default BookmarkList;