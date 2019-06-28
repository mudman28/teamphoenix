// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- COMPONENTS ----- //
import TasksCheckBox from '../TasksCheckBox/TasksCheckBox';

// ----- MATERIAL UI CORE ----- //
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';

// ----- MATERIAL UI ICONS ----- //
import ClearIcon from '@material-ui/icons/Clear';
import MoreVertIcon from '@material-ui/icons/MoreVert';

class TasksLineItems extends Component {

    // Click Listeners For Icons on Line Items
    handleClickCheckBox(id) {
        console.log('Checkbox Clicked', id);
        this.props.dispatch({ type: 'CHECK_TASK_BOX', payload: id })
    } // end handleClickCheckBox

    handleClickRemove(id) {
        console.log('Remove Clicked', id);
        this.props.dispatch({ type: 'REMOVE_TASK', payload: id })
    } // end handleClickRemove

    render() {

        let userTasks;

        userTasks = this.props.reduxState.tasks.map(({id, task_name, due_date, complete, contact_id, job_id, disabled}) => {
            return (
                <Paper key={id}>
                    <Toolbar>
                        <ListItem>
                            
                                <div className="moreMenu">
                                    <PopupState variant="popover" popupId="popup-menu">
                                        {popupState => (
                                            <React.Fragment>
                                                <Tooltip title="More">
                                                    <IconButton variant="contained" {...bindTrigger(popupState)} >
                                                        <MoreVertIcon/>
                                                    </ IconButton>
                                                </Tooltip>
                                                <Menu {...bindMenu(popupState)}>
                                                    <MenuItem onClick={popupState.close}>Add Note</MenuItem>
                                                    <MenuItem onClick={popupState.close}>Add To Contact</MenuItem>
                                                    <MenuItem onClick={popupState.close}>Add To Job</MenuItem>
                                                </Menu>
                                            </React.Fragment>
                                        )}
                                    </PopupState>
                                </div>
                                <Tooltip title="Mark Complete">
                                    <IconButton
                                        onClick={() => this.handleClickCheckBox(id)}
                                        // onClick={() => props.dispatch({ type: 'CHECK_TASK_BOX' })}
                                        size="small"
                                    >
                                        <TasksCheckBox
                                            complete={complete}
                                        />
                                    </IconButton>
                                </Tooltip>
                            <ListItemText>
                                {task_name}
                            </ListItemText>
                            <ListItemText className="dueDate">
                                {due_date}
                            </ListItemText>
                            <Tooltip title="Delete">
                                <IconButton
                                    onClick={() => this.handleClickRemove(id)}
                                    size="small"
                                >
                                    <ClearIcon />
                                </IconButton>
                            </Tooltip>
                        </ListItem>
                    </ Toolbar>
                </Paper>
            )

        })

        return (
            <List>
                {userTasks}
            </List>

        )

    }
}

const mapStateToProps = (reduxState) => {
    return {
        tasks: reduxState.tasksReducer,
        reduxState
    }
}

export default connect(mapStateToProps)(TasksLineItems);