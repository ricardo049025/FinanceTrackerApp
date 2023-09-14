import LoadingSpinner from "../../shared/Components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/Components/Context/auth-context";
import Mydatatable from '../../shared/Components/UIElements/Mydatatable';
import { useHttpClient } from "../../shared/Components/hooks/http-hook";
import ErrorModal from "../../shared/Components/UIElements/ErrorModal";
import React, { useEffect, useState, useContext } from 'react';
import { format } from 'date-fns';
import './Transaction.css';

const Transaction = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [transactions, setTransactions] = useState([]);

    const auth = useContext(AuthContext);
    const colums = [
        {
            name: 'ID',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'DESCRIPTION',
            selector: 'description',
            sortable: true,
        },
        {
            name: 'Amount ($)',
            selector: 'amount',
            sortable: true,
        },
        {
            name: 'Transaction Type',
            selector: 'isIncome',
            sortable: true,
        },
        {
            name: 'Transaction Date',
            selector: 'createdAt',
            sortable: true,
            cell: (row) => (
                <div>
                  {format(new Date(row.createdAt), 'yyyy-MM-dd')}
                </div>
              ),
        },
        {
            name: 'Actions',
            cell: (row) => (
              <div>
                <button className="btn btn-info btn-custom" onClick={() => console.log('view')}>View</button>
                <button className="btn btn-warning btn-custom" onClick={() =>console.log('edit')}>Edit</button>
              </div>
            ),
          },
    ]

    useEffect(() => {
        const fetchTransactions = async () => {
          try {
            const responseData = await sendRequest(
              process.env.REACT_APP_BACKEND_URL + "/transactions",
              'GET',
              null,
              {'x-auth-token': auth.token}
            );
            setTransactions(responseData);
          } catch (err) { console.log(err);}
        };

        fetchTransactions();

      }, [sendRequest]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverLay/>}
            { !isLoading && transactions && (
            <div className="container">
                <Mydatatable title="My Transactions" columns={colums}  data={transactions}/> 
            </div>
            )}
        </React.Fragment>
    )
}

export default Transaction;