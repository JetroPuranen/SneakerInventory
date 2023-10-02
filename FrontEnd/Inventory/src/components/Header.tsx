import { AppBar, Box, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

interface Props {
    children: JSX.Element;
}

const Header: FC<Props> = ({ children }) => {
    return (
        <>
            <Stack sx={{ marginTop: 2 }} alignItems="center">
                <AppBar position="static">
                    <Box sx={{ backgroundColor: "yellow", padding: "5px", textAlign: "center", color: "black", height: "70px" }}>
                        <Typography variant='h2'>Sneaker Inventaario</Typography>
                        
                    </Box>
                </AppBar>
            </Stack>
            { children }
        </>
    );
}

export default Header