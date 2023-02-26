import React from 'react';
import "./LoadingSpinner.css";

import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingSpinner() {
  return (
    <div className='loading-spinner'>
        <CircularProgress />
    </div>
  )
}
