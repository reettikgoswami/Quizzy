import React, { Fragment, useEffect, useState } from "react";
import FileSaver from "file-saver";

import reportApi from "apis/report";
import Spinner from "../common/Spinner";

function ReportDownload(props) {
  const [loading, setLoading] = useState(true);

  const downloadReport = async () => {
    try {
      const response = await reportApi.downloadReport();
      var blob = new Blob([response.data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      FileSaver.saveAs(blob, "report.xlsx");
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  const spinnerComponent = () => {
    return (
      <Fragment>
        <div className="mt-10 w-20 mx-auto ">
          <Spinner />
        </div>
        <div className="text-center text-lg font-medium text-gray-700 py-3">
          Your report is being prepared for downloading
        </div>
      </Fragment>
    );
  };

  const downloadButton = () => {
    return (
      <Fragment>
        <div className="mt-10 w-20 mx-auto text-center">
          <button
            className="rounded bg-blue-500 hover:bg-blue-600 py-1 px-3 text-white"
            onClick={downloadReport}
          >
            Download
          </button>
        </div>
        <div className="text-center text-lg font-medium text-gray-700 py-3">
          Report is now ready for downloading
        </div>
      </Fragment>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <div className="w-4/5 mx-auto">
        <div className="flex items-center py-6 ">
          <div className="text-2xl font-bold text-gray-700">Reports</div>
        </div>
      </div>
      {loading ? spinnerComponent() : downloadButton()}
    </div>
  );
}

export default ReportDownload;
