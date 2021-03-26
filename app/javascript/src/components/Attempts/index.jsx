import React, { useState, useEffect, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

import attemptApi from "apis/attempts";
import Toastr from "common/Toastr";

function Attempts(props) {
  const [loading, setLoading] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState(false);

  const slug = props.match.params.slug;

  const checkValidUrl = async () => {
    try {
      setLoading(true);
      const response = await attemptApi.isUrlValid(slug);
      setIsValidUrl(true);
    } catch (error) {
      if (error.response.status == 403) {
        Toastr.error(error.response.data.error);
      } else {
        logger.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkValidUrl();
  }, []);

  if (loading) {
    return <div>loading</div>;
  }
  return (
    <div className="font-bold font-serif text-xl text-center mt-32">
      {isValidUrl ? "Url is accessable" : "Url not published"}
    </div>
  );
}

export default withRouter(Attempts);
