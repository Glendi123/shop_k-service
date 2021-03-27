import React from 'react';
import s from '../Authorization.module.css'
import {makeStyles} from '@material-ui/core/styles';
import {useForm} from "react-hook-form";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logIn} from "../../../Redux/authReducer";
import {Button, Checkbox, FormControlLabel, TextField} from "@material-ui/core";
import {useFormControl} from "../FormControl";


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormControl-root': {
            marginBottom: theme.spacing(2),
            width: '100%',
        },

    },
    button: {
        textAlign: 'center',
        marginBottom: theme.spacing(2),
        '& .MuiButtonBase-root': {
            width: '226px',
        },
    },
    authInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
}));

export const Login = (props) => {
    const dispatch = useDispatch();
    const {register, handleSubmit, errors} = useForm();

    const onSubmit = (data) => {
        console.log(data)
        dispatch(logIn(data));
    };

    const classes = useStyles();
    return (
        <div className={s.signIn}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.root} autoComplete="off">
                <TextField required type={"email"} label={"E-mail"} variant="outlined" name={"email"}
                           inputRef={register({
                               required: true,
                               minLength: {value: 5, message: "Некорректный email"},
                               maxLength: {value: 30, message: "Слишком длинный email"},
                           })}
                           error={errors.email ? true : false}
                           helperText={errors.email && errors.email.message}
                />
                {useFormControl(register({
                    required: true,
                    minLength: {value: 6, message: "Слишком мало символов(Минимальное 6сим)"},
                    maxLength: {value: 15, message: "Слишком длинный пароль"},
                }),errors , "password")}

                <FormControlLabel
                    control={<Checkbox name={"check"} inputRef={register} color="primary"/>}
                    label="Запомнить"
                />

                <div className={classes.button}>
                    <Button type={"submit"} variant={"outlined"} color={"primary"}>
                        Войти
                    </Button>
                </div>
            </form>
            <div className={classes.authInfo}>
                <div><NavLink to="/change">Забыл пароль?</NavLink></div>
                <div><NavLink to="/register">Регистрироваться</NavLink></div>
            </div>
        </div>
    )
}