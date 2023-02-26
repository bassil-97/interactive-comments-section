import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';

export default function UserAvatar({ letter }) {
  return (
    <Avatar sx={{ bgcolor: deepPurple[500] }}>{letter.toUpperCase()}</Avatar>
  );
}