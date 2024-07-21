import React,{ lazy,Suspense } from 'react';

const OnlineCreditApplicationForm = lazy(() => import('./OnlineCreditApplicationForm'));
const UploadAttachment = lazy(() => import('./UploadAttachment'));



function FormOrUpload() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
        <div className="FormOrUpload">
            <div><OnlineCreditApplicationForm/></div>
            <div><UploadAttachment/></div>
        </div>
        </Suspense>
    );
}

export default FormOrUpload;
