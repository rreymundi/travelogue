import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from '../context/user';
import { 
  Box, 
  Button,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import TravelogueRow from '../components/TravelogueRow';
import DeletedTravelogueModal from '../modals/DeletedTravelogueModal';
import UpdatedTravelogueModal from '../modals/UpdatedTravelogueModal';
import PublishedTravelogueModal from '../modals/PublishedTravelogueModal';

const TraveloguesPage = ({ onDeleteTravelogue, openDeleteModal, handleOpenDeleteModal, openUpdateModal, openPublishedModal }) => {
  const {user} = useContext(UserContext);

  const renderedTravelogues = user?.travelogues.map((travelogue) => 
    <TravelogueRow key={travelogue.id} travelogue={travelogue} onDeleteTravelogue={onDeleteTravelogue} handleOpenDeleteModal={handleOpenDeleteModal} />
  );

  return (
    <Box sx={{
      backgroundColor: '#F7F7F6',
      padding: '3rem',
      minHeight: '100vh',
      }}
      >
      <Box sx={{ justifySelf: 'left' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
          <Typography sx={{ fontSize: '2.5rem' }}>Travelogues</Typography>
          <Typography sx={{ fontSize: '1.5rem'}}>
            Your published travelogues
          </Typography>
        </Box>
      </Box>
      <Box sx={{ m: '1rem', textAlign: 'end' }}>
        <Button variant="contained" color="primary" component={ Link } to="/mytravelogues/new">New</Button>
      </Box>
      <Box sx={{ backgroundColor: 'white', m: '1rem' }}>
        {/* table starts here */}
        {user?.travelogues.length === 0
          ? <Typography sx={{ fontSize: '1.5rem', textAlign: 'center', backgroundColor: '#F7F7F6' }}>
              No travelogues yet!
            </Typography>
          : <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography sx={{ fontWeight: 'bold' }}>Title</Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography sx={{ fontWeight: 'bold' }}>Published Date</Typography>
                    </TableCell>
                    <TableCell>
                      {/* this cell corresponds to the edit button column */}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* rendered rows go here */}
                  {renderedTravelogues}
                </TableBody>
              </Table>
            </TableContainer>
        }
        {/* table ends here */}
        <DeletedTravelogueModal open={openDeleteModal} />
        <UpdatedTravelogueModal open={openUpdateModal} />
        <PublishedTravelogueModal open={openPublishedModal} />
      </Box>
    </Box>
  )
}

export default TraveloguesPage