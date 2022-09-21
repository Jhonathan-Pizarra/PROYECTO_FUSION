import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Typography from "@mui/material/Typography";
import {CircularProgress, ListItemText, MenuItem} from "@mui/material";
import {useRouter} from "next/router";
import Grid from '@mui/material/Grid';
import {MUItheme} from "@/styles/Themes";
import {Styles} from "@/styles/MantenedoresStyle";

export default function ConfirmSale() {
    const classes = Styles();



    return (
        <div>
            <p>Hola Mundo</p>
        </div>
    );
}
