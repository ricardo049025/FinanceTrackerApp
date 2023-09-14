
import { faSackDollar, faSignOutAlt , faBalanceScale} from '@fortawesome/free-solid-svg-icons'
import LoadingSpinner from "../../shared/Components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/Components/Context/auth-context";
import { useHttpClient } from "../../shared/Components/hooks/http-hook";
import ErrorModal from "../../shared/Components/UIElements/ErrorModal";
import React, { useEffect, useState, useContext } from 'react';
import ChartComponent from '../components/ChartComponent';
import Boxmenu from  '../components/Boxmenu';
import './home.css';
import Transaction from '../../transactions/pages/Transaction';

const Home = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedSummary, setLoadedSummary] = useState();
    const [montlyIncomes, setMontlyIncomes] = useState();
    const [montlyExpenses, setMontlyExpenses] = useState([]);
    
    const auth = useContext(AuthContext);
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    useEffect(() => {
        const fetchSummary = async () => {
          try {
            const responseData = await sendRequest(
              process.env.REACT_APP_BACKEND_URL + "/transactions/user/summary",
              'GET',
              null,
              {'x-auth-token': auth.token}
            );
            setLoadedSummary(responseData);
          } catch (err) { console.log(err);}
        };

        const fetchMonthlyIncomes = async () => {
          try {
            const responseData = await sendRequest(
              process.env.REACT_APP_BACKEND_URL + "/transactions/user/montlyIncomes",
              'GET',
              null,
              {'x-auth-token': auth.token}
            );
            setMontlyIncomes(responseData);
          } catch (err) { console.log(err);}
        };

        const fetchMonthlyExpenses = async () => {
          try {
            const responseData = await sendRequest(
              process.env.REACT_APP_BACKEND_URL + "/transactions/user/montlyExpenses",
              'GET',
              null,
              {'x-auth-token': auth.token}
            );
            setMontlyExpenses(responseData);
          } catch (err) { console.log(err);}
        };

        fetchSummary();
        fetchMonthlyIncomes();
        fetchMonthlyExpenses();

      }, [sendRequest]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverLay/>}
            { !isLoading && loadedSummary && montlyIncomes && montlyExpenses && (
            <div>
                <div className="dashboard">
                    <Boxmenu color="#a2f7a2" icon={faSackDollar} title={`Incomes: $ ${loadedSummary.InComes}`} description="Your total incomes !! .."/>
                    <Boxmenu color="#f86c6b" icon={faSignOutAlt} title={`Expenses: $ ${loadedSummary.Expenses}`} description="Your expenses :-s .."/>
                    <Boxmenu color="#ffa726" icon={faBalanceScale} title={`Balance: $ ${loadedSummary.Balance}`} description="Your current balance. !"/>
                </div>

                <div className="dasboard-graph">
                    <ChartComponent title={`Montly Finances - ${ new Date().getFullYear()}`} labels={labels} Incomes={montlyIncomes} expenses={montlyExpenses} /> 
                    <Transaction />
                </div>
            </div>
            
            )}
        </React.Fragment>
      );
}

export default Home;