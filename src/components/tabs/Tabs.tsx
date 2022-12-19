import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {ModelList} from "../items/ItemsList";
import {FC} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../bll/store";
import styles from "../items/list.module.scss";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
type PropsType = {
    isLogin: boolean
}
export const BasicTabs: FC<PropsType> = ({isLogin}) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="TOP" {...a11yProps(0)} />
                    <Tab label="NEW" {...a11yProps(1)} />
                    <Tab label="APPROVED" {...a11yProps(2)} />
                    <Tab label="REJECTED" {...a11yProps(3)} />
                </Tabs>

            </Box>
            <TabPanel value={value} index={0}>
                <ModelList isLogin={isLogin} sorting={value}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ModelList isLogin={isLogin}  sorting={value}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ModelList isLogin={isLogin}  sorting={value}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <ModelList isLogin={isLogin}  sorting={value}/>
            </TabPanel>
        </Box>
    );
}
