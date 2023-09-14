import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE, VALIDATOR_NUMBER } from "../../shared/Components/utils/validator";
import CustomeCheckbox from "../../shared/Components/UIElements/CustomeCheckbox";
import LoadingSpinner from "../../shared/Components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/Components/Context/auth-context";
import { useHttpClient } from "../../shared/Components/hooks/http-hook";
import ErrorModal from "../../shared/Components/UIElements/ErrorModal";
import { useForm } from "../../shared/Components/hooks/form-hook";

import Button from "../../shared/Components/FormElements/Button";
import React, { useEffect, useState, useContext } from 'react';
import Input from "../../shared/Components/FormElements/Input";
import Card from "../../shared/Components/UIElements/Card";
import { useHistory } from "react-router-dom";
import CustomCheckbox from "../../shared/Components/UIElements/CustomeCheckbox";

const NewTransaction = () =>{
    
    const {isLoading, error,sendRequest,clearError} = useHttpClient();
    const [isChecked, setIsChecked] = useState(false);
    const auth = useContext(AuthContext);
    const history = useHistory();

    const [formState, inputHandler, setFormData] =   useForm({
        description: {
            value: '',
            isValid: false
        },
        amount:{
            value: '',
            isValid: false
        }
    },false)

    const onCheckboxChange = (state) => {
        setIsChecked(state);
    }

    const createTransactionHandler = async (event) =>{
        event.preventDefault();
        try {
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL + "/transactions", 
                'POST',
                JSON.stringify({description: formState.inputs.description.value, amount: formState.inputs.amount.value, isIncome: isChecked}),
                {
                    'x-auth-token': auth.token,
                    'Content-Type': 'application/json',
                }
            );
            
            alert('Transaction created !!');
            history.push("/");
        } catch (error) {} 
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <div className='authentication'>
                <Card>
                    {isLoading && <LoadingSpinner asOverLay/>}
                    <h2>New Transaction</h2>
                    <hr/>
                    <form onSubmit={createTransactionHandler}>
                        <Input 
                        id="description" 
                        element="input" 
                        type="text" 
                        label="Description" 
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]} 
                        errorText="Enter a description of at least 3 characters" 
                        onInput={inputHandler} />
                        <Input 
                        id="amount" 
                        element="input" 
                        type="text" 
                        label="Amount" 
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]} 
                        errorText="Enter an amount greater than zero" 
                        onInput={inputHandler} />
                        <CustomCheckbox label="Is Income ?" isChecked={isChecked} onCheckboxChange={onCheckboxChange} />
                        <Button type="submit" disabled={!formState.isValid}> OK</Button>
                    </form>
                    
                </Card>
            </div>
        </React.Fragment>
    );
}

export default NewTransaction;