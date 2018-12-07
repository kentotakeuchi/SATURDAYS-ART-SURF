import { els } from './base';


export const clearRegisterForm = () => {

    els.registerForm.addClass(`hidden`);
};

export const renderLoginForm = () => {

    els.loginForm.removeClass(`hidden`);
};