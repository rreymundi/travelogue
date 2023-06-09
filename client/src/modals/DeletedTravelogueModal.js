import React from 'react';
import { 
    Box,
    Typography,
    Modal 
    } from '@mui/material';

const DeletedTravelogueModal = ({ open }) => {

  return (
    <div>
     <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            }}
            >
          <Typography id="modal-modal-title" variant="h6" component="h2" color="error" sx={{ textAlign: 'center' }}>
            Travelogue deleted!
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default DeletedTravelogueModal