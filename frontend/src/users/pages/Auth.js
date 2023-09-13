import './Auth.css';
import { useHistory } from "react-router-dom";
import React, {useState, useContext} from "react";
import Card from "../../shared/Components/UIElements/Card";
import Input from "../../shared/Components/FormElements/Input";
import Button from "../../shared/Components/FormElements/Button";
import { useForm } from "../../shared/Components/hooks/form-hook";
import ErrorModal from "../../shared/Components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/Components/hooks/http-hook";
import ImageUpload from "../../shared/Components/FormElements/ImageUpload";
import { AuthContext } from "../../shared/Components/Context/auth-context";
import LoadingSpinner from "../../shared/Components/UIElements/LoadingSpinner";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/Components/utils/validator";


const Auth = () =>{

    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const {isLoading, error,sendRequest,clearError} = useHttpClient();
    const history = useHistory();

    const [formState, inputHandler, setFormData] =   useForm({
            email: {
                value: '',
                isValid: false
            },
            password:{
                value: '',
                isValid: false
            }
        },false)


    const authSubmitHandler = async (event) =>{
        event.preventDefault();
        console.log(formState.inputs);
        if(isLoginMode){
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + "/auth/login",
                    'POST',
                    JSON.stringify({email: formState.inputs.email.value,password: formState.inputs.password.value, creator: auth.userId}),
                    {'Content-Type': 'application/json'}); 
                    
                auth.login(responseData.user.userId,responseData.token, responseData.user.name); 
                history.push("/");
            } catch (error) {}
            
        }else{
            try {
                const formData = new FormData();
                formData.append('name',formState.inputs.name.value);
                formData.append('email',formState.inputs.email.value);
                formData.append('password',formState.inputs.password.value);
                formData.append('image',formState.inputs.image.value);

                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + "/auth/signup", 
                    'POST',
                    formData
                )
                
                auth.login(responseData.user.userId,responseData.token, responseData.user.name); 
                history.push("/");
            } catch (error) {} 
            
        }
    }

    const switchModeHandler = (event) =>{
        if(!isLoginMode){
            setFormData({
                ...formState.inputs,
                name: undefined,
                image: undefined
            },formState.inputs.email.isValid && formState.inputs.password.isValid )
        }else{
            setFormData({
                ...formState.inputs,
                name:{
                    value: '',
                    isValid: false
                },
                image:{
                    value: null,
                    isValid: false
                }
            },false)
        }

        setIsLoginMode(prevMode => !prevMode);
    }

    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <div className='authentication'>
                <Card>
                    {isLoading && <LoadingSpinner asOverLay/>}
                    <h2>{isLoginMode ? ' Login' : 'SIGNUP'}</h2>
                    <hr/>
                    <form onSubmit={authSubmitHandler}>
                        {!isLoginMode && 
                        <Input 
                        id="name" 
                        element="input" 
                        type="text" 
                        label="Your Name" 
                        validators={[VALIDATOR_REQUIRE()]} 
                        errorText="Please enter a name." 
                        onInput={inputHandler} />
                        }
                        {!isLoginMode && <ImageUpload center id="image" onInput={inputHandler}/>}
                        <Input
                        id="email"
                        element="input"
                        type="email"
                        label="E-mail"
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                        errorText="Please enter a valid email."
                        onInput={inputHandler}
                        />
                        <Input
                            id="password"
                            element="input"
                            type="password"
                            label="Password"
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                            errorText="Please enter a valid email, at least 5 characters"
                            onInput={inputHandler}
                        />
                        <Button type="submit" disabled={!formState.isValid}>{isLoginMode ? 'LOGIN' : 'SIGNUP'}</Button>
                    </form>
                    <Button inverse onClick={switchModeHandler}>SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}</Button>
                </Card>
            </div>
        </React.Fragment>
    )
}

export default Auth;