import React from 'react';
import {
    Drawer,
    Toolbar,
    List,
    Divider,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';

export default function SidebarDrawer({ files, selected, onSelect }) {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            <Divider />
            <List>
                {files.map(name => (
                    <ListItemButton
                        key={name}
                        selected={name === selected}
                        onClick={() => onSelect(name)}
                    >
                        <ListItemIcon>
                            <DescriptionIcon />
                        </ListItemIcon>
                        <ListItemText primary={name} />
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
}
