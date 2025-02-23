import xlsx from "json-as-xlsx";
const exportFile = (info) => {
    const columns = Object.keys(info[0]).map((key) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1),
      value: key,
    }));
    const formatedInfo = [{ sheet: "Sheet1", columns, content: info }];
    const settings = {
      fileName: "MySpreadsheet",
      extraLength: 3,
      writeMode: "writeFile",
      writeOptions: {},
      RTL: false,
    };
    xlsx(formatedInfo, settings);
};
export default exportFile;