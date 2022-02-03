import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {Bar} from 'react-chartjs-2';
import {Box, Button, Card, CardContent, CardHeader, colors, Divider, makeStyles, useTheme} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {}
}));

const UsersByDevice = ({className, ...rest}: any) => {
    const classes = useStyles();
    const theme = useTheme();

    const data = {
        datasets: [
            {
                backgroundColor: colors.indigo[500],
                data: [18, 5, 19, 27, 29, 19, 20],
                label: 'Этот год'
            },
            {
                backgroundColor: colors.grey[200],
                data: [11, 20, 12, 29, 30, 25, 13],
                label: 'В прошлом году'
            }
        ],
        labels: ['1 Авг', '2 Авг', '3 Авг', '4 Авг', '5 Авг', '6 Авг']
    };

    const options = {
        animation: false,
        cornerRadius: 20,
        layout: {padding: 0},
        legend: {display: false},
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            xAxes: [
                {
                    barThickness: 12,
                    maxBarThickness: 10,
                    barPercentage: 0.5,
                    categoryPercentage: 0.5,
                    ticks: {
                        fontColor: theme.palette.text.secondary
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    }
                }
            ],
            yAxes: [
                {
                    ticks: {
                        fontColor: theme.palette.text.secondary,
                        beginAtZero: true,
                        min: 0
                    },
                    gridLines: {
                        borderDash: [2],
                        borderDashOffset: [2],
                        color: theme.palette.divider,
                        drawBorder: false,
                        zeroLineBorderDash: [2],
                        zeroLineBorderDashOffset: [2],
                        zeroLineColor: theme.palette.divider
                    }
                }
            ]
        },
        tooltips: {
            backgroundColor: theme.palette.background.default,
            bodyFontColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 1,
            enabled: true,
            footerFontColor: theme.palette.text.secondary,
            intersect: false,
            mode: 'index',
            titleFontColor: theme.palette.text.primary
        }
    };

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >
            <CardHeader title=""/>
            <div className="userByDeviceCardHeader">
                <div className="">
                    <p className="userByDeviceCardHeaderText mb-0">Пользователи по устройствам</p>
                </div>
                <div className="">
                    <Button
                        endIcon={<i className="icon icon-ic_arrow_right"/>}
                        className="userByDeviceCardHeaderBtn"
                    >
                        Последние 7 дней
                    </Button>
                </div>
            </div>
            <CardContent>
                <Box
                    height={400}
                    position="relative"
                >
                    <Bar
                        data={data}
                        options={options}
                    />
                </Box>
            </CardContent>
            <Divider/>

            <div className="userByDeviceCardBottom">
                <div className="">
                    <Button
                        endIcon={<i className="icon icon-ic_arrow_right2"/>}
                        className="userByDeviceCardBottomBtn"
                    >
                        Просмотреть все
                    </Button>
                </div>
            </div>
        </Card>
    );
};

UsersByDevice.propTypes = {
    className: PropTypes.string
};

export default UsersByDevice;