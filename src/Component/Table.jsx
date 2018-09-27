import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { lighten } from '@material-ui/core/styles/colorManipulator';

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
    counter += 1;
    return { id: counter, name, calories, fat, carbs, protein };
}

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
    { id: 'name', numeric: false, disablePadding: true, label: '文件名' },
    { id: 'calories', numeric: true, disablePadding: false, label: '分类' },
    { id: 'fat', numeric: true, disablePadding: false, label: '发布日期' },
    { id: 'carbs', numeric: true, disablePadding: false, label: '发布单位' },
    { id: 'protein', numeric: true, disablePadding: false, label: '等级' },
    { id: 'operation', numeric: true, disablePadding: false, label: '操作' },
];

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        console.log("sort");
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.id === 'name' ? "checkbox" : row.disablePadding ? 'none' : 'default'}
                                sortDirection={(row.id === "protein" || row.id === "operation") ? false : orderBy === row.id ? order : false}
                            >
                                {(row.id === "protein" || row.id === "operation") ?
                                    row.label
                                    :
                                    <Tooltip
                                        title="排序"
                                        placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                        enterDelay={300}
                                    >
                                        <TableSortLabel
                                            active={orderBy === row.id}
                                            direction={order}
                                            onClick={this.createSortHandler(row.id)}
                                        >
                                            {row.label}
                                        </TableSortLabel>
                                    </Tooltip>
                                }
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let EnhancedTableToolbar = props => {
    const { queryString, classes } = props;

    return (
        <Toolbar
            className={classNames(classes.root)}
        >
            <div className={classes.title}>
                {queryString  ? (
                    <Typography color="inherit" variant="subheading">
                        搜索 {queryString} 的结果为
                    </Typography>
                ) : (
                    <Typography variant="title" id="tableTitle">
                        最新文件
                    </Typography>
                )}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        minWidth: 275,
        maxWidth: "90%",
        margin: "0 auto"
        // marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class EnhancedTable extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'name',
        data: [
            createData('Cupcake', 305, 3.7, 67, '0'),
            createData('Donut', 452, 25.0, 51, '0'),
            createData('Eclair', 262, 16.0, 24, '1'),
            createData('Frozen yoghurt', 159, 6.0, 24, '1'),
            createData('Gingerbread', 356, 16.0, 49, '2'),
            createData('Honeycomb', 408, 3.2, 87, '2'),
            createData('Ice cream sandwich', 237, 9.0, 37, '2'),
            createData('Jelly Bean', 375, 0.0, 94, '1'),
            createData('KitKat', 518, 26.0, 65, '1'),
            createData('Lollipop', 392, 0.2, 98, '0'),
            createData('Marshmallow', 318, 0, 81, '0'),
            createData('Nougat', 360, 19.0, 9, '1'),
            createData('Oreo', 437, 18.0, 63, '1'),
        ],
        page: 0,
        rowsPerPage: 10,
    };

    handleRequestSort = (event, property) => {
        console.log("aaaa");
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleClick = (event, id) => {
        console.log("click", id);
    };

    render() {
        const { classes } = this.props;
        const { data, order, orderBy, rowsPerPage, page } = this.state;
        console.log(this.state);

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar queryString="哈哈哈" />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                        />
                        <TableBody>
                            {stableSort(data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={n.id}
                                            onClick={event => this.handleClick(event, n.id)}
                                        >
                                            <TableCell component="th" scope="row" padding="checkbox">
                                                {n.name}
                                            </TableCell>
                                            <TableCell numeric>{n.calories}</TableCell>
                                            <TableCell numeric>{n.fat}</TableCell>
                                            <TableCell numeric>{n.carbs}</TableCell>
                                            <TableCell numeric>{n.protein}</TableCell>
                                            <TableCell numeric>
                                                <Button color="primary" variant="outlined">
                                                    view
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': '上一页',
                    }}
                    nextIconButtonProps={{
                        'aria-label': '下一页',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);