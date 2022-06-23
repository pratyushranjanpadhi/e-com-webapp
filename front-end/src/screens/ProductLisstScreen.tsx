import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { deleteProduct, listProduct, createProduct } from "../actions/productAction/productActions";
import * as actionTypes from "../actionTypes";
import MyPagination from "../components/MyPagination";
import { useHistory, useParams } from "react-router-dom";

const ProductListScreen: React.FC = () => {
   const { page: pageNumber } = useParams<{ page: string }>();
   const history = useHistory();
   const dispatch = useDispatch();
   const productList = useSelector((state: any) => state.productList);
   const { loading, error, products, page, totalPages } = productList;
   const userLogin = useSelector((state: any) => state.userLogin);
   const { userInfo } = userLogin;
   const productDelete = useSelector((state: any) => state.productDelete);
   const { loading: deleteLoading, success: deleteSuccess, error: deleteError } = productDelete;
   const productCreate = useSelector((state: any) => state.productCreate);
   const {
      loading: createLoading,
      success: createSuccess,
      error: createError,
      product: createdProduct,
   } = productCreate;

   useEffect(() => {
      dispatch({ type: actionTypes.PRODUCT_CREATE_RESET });
      if (!userInfo || !userInfo.isAdmin) {
         history.push("/login");
      }
      if (createSuccess) {
         history.push(`/admin/product/${createdProduct._id}/edit`);
      } else {
         dispatch(listProduct(pageNumber));
      }
   }, [dispatch, history, deleteSuccess, userInfo, createSuccess, createdProduct, pageNumber]);

   const deleteHandler = (id: any) => {
      if (window.confirm("Are you sure")) {
         dispatch(deleteProduct(id));
      }
   };

   const createProductHandler = () => {
      dispatch(createProduct());
   };

   return (
      <>
         <Row className="align-items-center">
            <Col>
               <h1>Products</h1>
            </Col>
            <Col className="text-right">
               <Button className="my-3" onClick={createProductHandler}>
                  <i className="fas fa-plus"></i> Create Product
               </Button>
            </Col>
         </Row>
         {createLoading && <Loader />}
         {createError && <Message>{createError}</Message>}
         {deleteLoading && <Loader />}
         {deleteError && <Message>{deleteError}</Message>}
         {loading ? (
            <Loader />
         ) : error ? (
            <Message>{error}</Message>
         ) : (
            <>
               <Table striped bordered hover responsive className="table-sm">
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                     </tr>
                  </thead>
                  <tbody>
                     {products.map((product: any) => (
                        <tr key={product._id}>
                           <td>{product._id}</td>
                           <td>{product.name}</td>
                           <td>${product.price}</td>
                           <td>{product.category}</td>
                           <td>{product.brand}</td>
                           <td>
                              <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                 <Button variant="light" className="btn-sm">
                                    <i className="fas fa-edit"></i>
                                 </Button>
                              </LinkContainer>
                              <Button
                                 variant="danger"
                                 className="btn-sm"
                                 onClick={() => deleteHandler(product._id)}
                              >
                                 <i className="fas fa-trash"></i>
                              </Button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </Table>
               <MyPagination page={page} pages={totalPages} isAdmin={true} />
            </>
         )}
      </>
   );
};

export default ProductListScreen;
