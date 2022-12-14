import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import styles from './drawer.module.scss'
import {Filter} from "../filter/Filter";
import {useSelector} from "react-redux";
import {RootState} from "../../bll/store";

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export const  DrawerWrapper = () => {
    const [state, setState] = React.useState({
        right: false,
    });

    const filter = useSelector((state: RootState) => state.modelsReducer.filter)

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
        >
            <Filter handleSearchCallback={() => setState({right: false})} initialFilterValues={filter}/>
        </Box>
    );

    return (
        <div className={styles.wrapper}>
                <React.Fragment>
                    <Button onClick={toggleDrawer('right', true)} variant={'contained'} color={'warning'}>SEARCH</Button>
                    <Drawer
                        anchor={'right'}
                        open={state['right']}
                        onClose={toggleDrawer('right', false)}
                    >
                        {list()}

                    </Drawer>
                </React.Fragment>
        </div>
    );
}
