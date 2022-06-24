import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
interface Props {
   pages: number;
   page: number;
   isAdmin?: boolean;
}
const MyPagination: React.FC<Props> = ({ pages, page, isAdmin = false }) => {
   return (
      <>
         {pages > 1 && (
            <Pagination>
               {[...Array(pages).keys()].map((x) => (
                  <LinkContainer
                     key={x + 1}
                     to={!isAdmin ? `/page/${x + 1}` : `/admin/productList/${x + 1}`}
                  >
                     <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                  </LinkContainer>
               ))}
            </Pagination>
         )}
      </>
   );
};

export default MyPagination;
