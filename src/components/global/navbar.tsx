import { alpha, InputBase, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


export function NavBar() {
    return (
        <nav className="bg-primary fixed w-full left-0 top-0 z-[100000] text-white flex items-center justify-between p-4">
            <div className="flex items-center ms-12 me-6">
                <img src="/logo.jpeg" alt="AgroBoli" className="h-10 w-10 mr-2 rounded-full" />
                <span className="text-xl font-bold">AgroBoli</span>
            </div>

            <div className="flex-1 mx-4">
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
            </div>

            <div className="flex items-center space-x-4 me-12 ms-6">
                <div className="relative">
                    <NotificationsIcon />
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-1">
                        16
                    </span>
                </div>
                <ShoppingCartIcon />
                <AccountCircleIcon />
            </div>
        </nav>
    );
}