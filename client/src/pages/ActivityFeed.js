import React from 'react'
import {
    Box,
    Typography,
    Grid
} from '@mui/material'
import TravelogueCard from '../components/TravelogueCard'

const ActivityFeed = ({ follows, travelogues }) => {

    const followIds = follows?.map(follow => follow.id)
    const filteredActivity = travelogues?.filter(travelogue => followIds?.includes(travelogue.user.id)).sort((a,b) => a.created_at - b.created_at).slice(0, 5)
    
    const renderedActivity = filteredActivity?.map(travelogue =>
        <TravelogueCard item key={travelogue.id} travelogue={travelogue} />
    )

    return (
        <Box sx={{
          backgroundColor: '#F7F7F6',
          padding: '3rem',
          display: 'grid',
          minHeight: '100vh',
          }}>
          <Box>
              <Box>
                  <Typography sx={{ fontSize: '2.5rem' }}>Activity Feed</Typography>
                  <Typography sx={{ fontSize: '1.5rem'}}>
                      Latest travelogues from people you follow
                  </Typography>
                  <Box sx={{ margin: '2.5rem'}}>
                    <Grid container spacing={2}>
                    {renderedActivity}
                    </Grid>
                  </Box>
              </Box>
          </Box>      
        </Box>
      )
}

export default ActivityFeed