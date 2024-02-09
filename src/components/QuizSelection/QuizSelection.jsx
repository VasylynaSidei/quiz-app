import "./QuizSelection.css";
import { useNavigate } from "react-router-dom";
import { GiThink } from "react-icons/gi";
import { FcAcceptDatabase } from "react-icons/fc";
import { TbWorldHeart } from "react-icons/tb";
import { FcBiomass } from "react-icons/fc";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { FcMusic } from "react-icons/fc";
import { FcFilmReel } from "react-icons/fc";
import { FcFaq } from "react-icons/fc";
import { FcBiotech } from "react-icons/fc";
export const QuizSelection = () => {
  const navigate = useNavigate();

  const handleClick = (selectedCatagory) => {
    navigate(`/quiz/${selectedCatagory}`);
  };

  return (
    <>
      <div>
        <h2 style={{ fontSize: "100px", marginBottom: "37px" }}>
          <GiThink />
          WELCOME TO QUIZ GAME
          <GiPerspectiveDiceSixFacesRandom />
        </h2>
        <h2 style={{ fontSize: "6em", textAlign: "center" }}>
          Quiz Selection <FcAcceptDatabase style={{ fontSize: "5rem" }} />
        </h2>
        <div style={{ fontSize: "30px", height: "450px", padding: "16px" }}>
          <div
            className="category"
            onClick={() => handleClick("general-knowledge")}
          >
            General Knowledge <FcFaq />
            <TbWorldHeart />
          </div>
          <div
            className="category"
            onClick={() => handleClick("science-computers")}
          >
            Science <FcBiomass />
            <FcBiotech />
          </div>
          <div
            className="category"
            onClick={() => handleClick("entertainment")}
          >
            Entertainment
            <FcMusic />
            <FcFilmReel />
          </div>
        </div>
      </div>
    </>
  );
};
