import React, { useState, useEffect } from "react";
function Card(props) {
  const savedArray = props.savedArticles;
  const articlesToSave = props.articlesToSave;
  const articlesToRemove = props.articlesToRemove;
  const setArticlesToSave = props.setArticlesToSave;
  const setArticlesToRemove = props.setArticlesToRemove;
  const checkIfSaved = (item) => {
    return item.link === props.article.link;
  };
  const isSaved = () => {
    if (Array.isArray(savedArray) && savedArray.length === 1) {
      return checkIfSaved(savedArray[0]);
    } else if (Array.isArray(savedArray)) {
      return savedArray.some(checkIfSaved);
    }
    return false;
  };
  const savedState = isSaved();

  const [saved, setSaved] = useState(false);

  /*const handleCardClick = () => {
    if (props.location.pathname === "/") {
      if (!saved) {
        setArticlesToSave(
          Array.isArray(articlesToSave) && articlesToSave.length > 0
            ? [...articlesToSave, props.article]
            : [props.article]
        );
        setSaved(true);
        return;
      }
      setArticlesToRemove(
        Array.isArray(articlesToRemove) && articlesToRemove.length > 0
          ? [...articlesToRemove, props.article]
          : [props.article]
      );
    }
    return props.handleDeleteArticle(props.article);
  };*/

  useEffect(() => {
    const setSavedState = () => {
      if (savedState && savedState !== null) {
        return setSaved(true);
      }
      return setSaved(false);
    };
    setSavedState();
  }, [savedState, savedArray]);
  return (
    <li className="card" id={props.id}>
      <img
        className="card__image"
        src={props.article.image}
        alt={props.article.title}
      />
      {props.location.pathname === props.savedNewsPath ? (
        <button className="card__keyword" disabled type="button">
          {props.article.keyword}
        </button>
      ) : null}
      <button
        className={`card__label${
          props.location.pathname === props.savedNewsPath ? " card__label_trashbin" : ""
        }${saved ? " card__label_marked" : ""}`}
        disabled={!props.loggedIn}
        onClick={() =>
          props.location.pathname === props.savedNewsPath
            ? props.deleteCard
            : props.handleAddCard
        }
      ></button>
      {(props.loggedIn && props.location.pathname === props.savedNewsPath) ||
      !props.loggedIn ? (
        <button className="card__alert" disabled type="button">
          {`${
            props.location.pathname === props.savedNewsPath
              ? "Remove from saved"
              : "Sign in to save articles"
          }`}
        </button>
      ) : null}

      <article className="card__article">
        <div className="card__text">
          <p className="card__date">{`${saved}`}</p>
          <h2 className="card__title">{props.article.title}</h2>
          <p className="card__paragraph">{props.article.text}</p>
        </div>
        <p className="card__source">{props.article.source}</p>
      </article>
    </li>
  );
}

export default Card;
