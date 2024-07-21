import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [open,setOpen] = useState(false);
  const [responseMessage,setResponseMessage]=useState("");
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setLoading(true);
      setProgress(0);
      const reader = new FileReader();

      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          const percentLoaded = Math.round((e.loaded / e.total) * 100);
          setProgress(percentLoaded);
        }
      };

      reader.onload = () => {
        setLoading(false);
      };

      reader.onerror = () => {
        console.error('Error reading file');
        setLoading(false);
      };

      reader.readAsText(selectedFile);
    }
  };

  const handleClose =()=>{
    setOpen(false)
  }

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      setButtonLoading(true)
      axios.post('http://localhost:8080/uploadAttachments', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent?.total );
          setProgress(percentCompleted);
        },
      })
        .then((response) => {
          console.log('File uploaded successfully:', response);
          if (response.status == 200) {
            setFile(null)
            setButtonLoading(false)
            setOpen(true)
            setResponseMessage(response.data)
          }
        })
        .catch((error)=>{
          console.error('Error uploading file:', error);
          setFile(null);
          setButtonLoading(false);
          setOpen(true);
          setResponseMessage("error while uploding");
        });
    }
  };

  return (
    <Box>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput
          type="file"
          onChange={handleFileChange}
          accept=".txt,.pdf,.doc,.csv"
        />
      </Button>
      <LoadingButton
        loading={buttonLoading}
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="contained"
        onClick={handleUpload}
        disabled={!file}
        sx={{ ml: 2 }}
      >Save</LoadingButton>
      {loading && (
        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" color="textSecondary" align="center">
            {`${progress}%`}
          </Typography>
        </Box>
      )}
        <Dialog  open={open} onClose={handleClose}>
        <DialogTitle>INFO</DialogTitle>
        {responseMessage}
        </Dialog>
    </Box>
  );
}