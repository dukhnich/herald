import React from "react";

import Spinner from "./../../shared/components/Spinner";
import useQuery from "./../../shared/hooks/use-query";
import { gql } from "graphql-request";
import {BrowserRouter as Router, Link} from "react-router-dom";
import NavBar from "../../shared/components/navigation/NavBar";

const query = gql`
  query {
    CategoryFind(query: "[{}]") {
      name
      _id
      subCategories {
        name
        _id
        image {
          url
        }
      }
      image {
        url
      }
    }
  }
`;

const HomeScreen = () => {
    // const { data, status } = useQuery({
    //     query,
    //     initialState: { CategoryFind: [] }
    // });

    return (
        <>
        <NavBar />
        <div className="mt-3">
            {/*{status === "pending" ? (*/}
            {/*    <Spinner />*/}
            {/*) : (*/}
            {/*    <CategoryList categories={data.CategoryFind} />*/}
            {/*)}*/}
            <h1>Welcome!</h1>
        </div>
            </>
    );
};

export default HomeScreen;
