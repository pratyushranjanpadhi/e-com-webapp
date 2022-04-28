import React from "react";

interface Props {
   rating: number;
   details: string;
}
const Rating: React.FC<Props> = ({ rating, details }) => {
   return (
      <div>
         <span style={{ color: "yellow" }}>
            <i
               className={
                  rating >= 1
                     ? "fas fa-star"
                     : rating >= 0.5
                     ? "fas fa-star-half-alt"
                     : "far fa-star"
               }
            ></i>
         </span>
         <span style={{ color: "yellow" }}>
            <i
               className={
                  rating >= 2
                     ? "fas fa-star"
                     : rating >= 1.5
                     ? "fas fa-star-half-alt"
                     : "far fa-star"
               }
            ></i>
         </span>
         <span style={{ color: "yellow" }}>
            <i
               className={
                  rating >= 3
                     ? "fas fa-star"
                     : rating >= 2.5
                     ? "fas fa-star-half-alt"
                     : "far fa-star"
               }
            ></i>
         </span>
         <span style={{ color: "yellow" }}>
            <i
               className={
                  rating >= 4
                     ? "fas fa-star"
                     : rating >= 3.5
                     ? "fas fa-star-half-alt"
                     : "far fa-star"
               }
            ></i>
         </span>
         <span style={{ color: "yellow" }}>
            <i
               className={
                  rating >= 5
                     ? "fas fa-star"
                     : rating >= 4.5
                     ? "fas fa-star-half-alt"
                     : "far fa-star"
               }
            ></i>
         </span>
         <span className="mx-2">{details}</span>
      </div>
   );
};

export default Rating;
