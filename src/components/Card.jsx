import { Link } from "react-router-dom";
import "./Card.css";
import editP from "../assets/84380.png";

const Card = (props) => {
  return (
    <div className="post-info">
      <img src={props.imageURL} alt="Post Image" />
      <Link to={"/update/" + props.id}>
        <img className="edit-button" alt="edit button" src={editP} />
      </Link>
      <Link to={"/detail/" + props.id}>
        <h2 className="card-info">Name: {props.name}</h2>
        <h2 className="card-info">Url: {props.url}</h2>
        <h2 className="card-info">Description: {props.description}</h2>
      </Link>
    </div>
  );
};

export default Card;
