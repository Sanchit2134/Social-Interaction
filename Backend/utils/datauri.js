// used to convert an uploaded file (like an image) into a Data URI (base64 string).
import DataUriParser from "datauri/parser.js";
import path from "path"

const parser = new DataUriParser();   //is a class from the datauri package used to convert files (like images) into Data URI (base64) strings.

const getDataUri = (file) => {
    const extName = path.extname(file.originalname).toString();      //path.extname(file.originalname)----------> gets the file extension (e.g., .jpg).
    return parser.format(extName, file.buffer).content;   // parser.format(extName, file.buffer).content-----------> converts the file buffer to a Data URI string.
};
export default getDataUri;
//A file buffer is a temporary storage area in memory that holds the raw binary data of a file.