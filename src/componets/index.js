import OnlineCreditApplicationForm from "./OnlineCreditApplicationForm";
import UploadAttachment from "./UploadAttachment";

function FormOrUpload() {
    return (
        <div className="FormOrUpload">
            <div><OnlineCreditApplicationForm/></div>
            <div><UploadAttachment/></div>
        </div>
    );
}

export default FormOrUpload;
