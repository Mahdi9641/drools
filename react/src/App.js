import React, { useState, useMemo } from 'react';
import { CssBaseline, Toolbar, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';

import { fetchFiles } from './api/drools';
import HeaderBar from './components/HeaderBar';
import SidebarDrawer from './components/SidebarDrawer';
import RuleEditor from './components/RuleEditor';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
    const [selected, setSelected] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    const theme = useMemo(
        () => createTheme({ palette: { mode: darkMode ? 'dark' : 'light' } }),
        [darkMode]
    );

    const { data: files = [], isLoading } = useQuery({
        queryKey: ['files'],
        queryFn: fetchFiles,
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <HeaderBar darkMode={darkMode} toggleDarkMode={() => setDarkMode(m => !m)} />
            <Box sx={{ display: 'flex' }}>
                <SidebarDrawer
                    files={isLoading ? [] : files}
                    selected={selected}
                    onSelect={setSelected}
                />
                <Box component="main" sx={{ flexGrow: 1 }}>
                    <Toolbar />
                    <RuleEditor fileName={selected} />
                </Box>
            </Box>
            <ToastContainer position="bottom-right" />
        </ThemeProvider>
    );
}
