import React from 'react'

const Travelogue = () => {
  return (
    <ListItem>
        <ListItemButton>
            <ListItemText>
                TRAVELOGUE 1
            </ListItemText>
            <ListItemText>
                Published date
            </ListItemText>
            <ListItemButton sx={{ justifyContent: 'end' }}>
                <ListItemIcon>
                    <MoreHorizIcon />
                </ListItemIcon>
            </ListItemButton>
        </ListItemButton>
    </ListItem>
  )
}

export default Travelogue