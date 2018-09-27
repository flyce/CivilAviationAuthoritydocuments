import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';

import history from '../Router/history';

const styles = theme => ({
    root: {
        width: '100%',
        position: 'fixed', zIndex: 1
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    drawerPaper: {
        position: 'relative',
        width: 240,
        minHeight: "100vh"
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },

});

class SearchAppBar extends React.PureComponent {
    state = {
        open: false,
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const {classes} = this.props;
        const { open } = this.state;

        const drawer = (
            <Drawer
                open={open}
                onClose={this.handleDrawerClose}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div
                    tabIndex={0}
                    role="button"
                >
                    <List>
                        <ListItem
                            button
                            selected={this.state.selectedIndex === 0}
                            onClick={() => {history.push('/')}}
                        >
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="首页" />
                        </ListItem>
                    </List>
                    <Divider/>
                    <List>
                        <ListItem
                            button
                            selected={this.state.selectedIndex === 1}
                            onClick={() => {history.push('/about')}}
                        >
                            <ListItemIcon>
                                <InfoIcon />
                            </ListItemIcon>
                            <ListItemText primary="关于我们" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        );

        return (
            <div className={classes.root}>
                {drawer}
                <AppBar>
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="打开抽屉" onClick={this.handleDrawerOpen}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography className={classes.title} variant="title" color="inherit" noWrap>
                            局方文件查询
                        </Typography>
                        <div className={classes.grow}/>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <Input
                                placeholder="搜索…"
                                disableUnderline
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

SearchAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SearchAppBar);
