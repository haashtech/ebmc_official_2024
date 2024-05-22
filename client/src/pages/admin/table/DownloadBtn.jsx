// import { DownloadIcon } from "../Icons/Icons";
import { Button } from "react-bootstrap";
import * as XLSX from "xlsx/xlsx.mjs";

const DownloadBtn = ({ data = [], fileName }) => {
  return (
    <Button variant="secondary" size="sm"
      className="download-btn bg-white outline-none border-none"
      onClick={() => {
        const datas = data?.length ? data : [];
        const worksheet = XLSX.utils.json_to_sheet(datas);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, fileName ? `${fileName}.xlsx` : "data.xlsx");
      }}
    >
      {/* <DownloadIcon /> */}
      Download
    </Button>
  );
};

export default DownloadBtn;