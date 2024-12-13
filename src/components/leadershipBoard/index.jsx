import React from 'react';
import { Box, List, ListItem, ListItemText, Avatar, Typography, Divider } from '@mui/material';

const leaderboardData = [
  { id: 1, name: 'Alice', score: 1500, avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Bob', score: 1200, avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, name: 'Charlie', score: 1000, avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 4, name: 'David', score: 900, avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: 5, name: 'Eve', score: 800, avatar: 'https://i.pravatar.cc/150?img=5' },
];

const Leaderboard = () => {
  return (
    <Box sx={{
      width: 300,
      backgroundColor: '#fff',
      padding: 3,
      boxShadow: 2,
      borderRadius: 2,
    }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Leaderboard
      </Typography>

      <List>
        {leaderboardData.map((user, index) => (
          <React.Fragment key={user.id}>
            <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar alt={user.name} src={user.avatar} sx={{ width: 40, height: 40, marginRight: 2 }} />
              <ListItemText
                primary={<Typography variant="body1" sx={{ fontWeight: index === 0 ? 'bold' : 'normal' }}>{user.name}</Typography>}
                secondary={<Typography variant="body2">{`Score: ${user.score}`}</Typography>}
              />
            </ListItem>
            {index !== leaderboardData.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Leaderboard;
