import ArchiveIcon from '@mui/icons-material/Archive';
import MailIcon from '@mui/icons-material/Mail';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export function SideBar() {
    // const isMobile = window.innerWidth < 768;

    return (
        <aside className="hidden lg:block absolute left-0 top-0 bg-slate-100 shadow-2xl min-h-screen w-full">
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ?
                                    <MailIcon /> :
                                    <ArchiveIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </aside>
    );
}