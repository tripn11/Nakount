import React, {useState} from "react";
import { useSelector } from "react-redux";
import moment from 'moment'
import numeral from 'numeral';
import { DateRangePicker } from 'react-dates';
import dashboardSorter from "../sorter/dashboardSorter";
import numeralFormat from "../Numeral/numeralFormat";
import logo from '../Images/logo.png';

numeralFormat(); //must be outside the component, and must be run once in the entire project, or errors will occur

const DashboardPage = () => {
    const auth = useSelector(state=>state.auth);
    const records = useSelector(state=>state.records)
    const [range, setRange] =  useState({
        startDate: moment().startOf('month').valueOf(),
        endDate: moment().endOf('day').valueOf(),
        focused: null
    })

    const datesChanged = ({ startDate, endDate }) => { //putting the conditionals in the setRange function won't work,
        //wierd behavior from moment
        if (startDate === null || endDate === null) {
            setRange({
                startDate: moment().startOf('month').valueOf(),
                endDate: moment().valueOf(),
                focused: range.focused
            });
        } else {
            setRange({
                startDate: startDate.valueOf(),
                endDate: endDate.valueOf(),
                focused: range.focused
            });
        }
    };
    
    const focusChanged = (focused) => {
        setRange({
            startDate: range.startDate,
            endDate: range.endDate,
            focused: focused
        });
    };
    

    const qualified = () => {
        const fakeState = {records};
        const totals = dashboardSorter(fakeState.records, range);
        return totals
    }

    return (
        <div id="dashboard-page">
            <img src={logo} alt="logo"/>
            <div id="welcome">
                <h3>{auth.name}</h3>
                <p>Welcome back</p>
            </div>

            <div id="dashboard-details_container">
                <div>
                    <span>Balance</span>
                    <p>{numeral(qualified().total).format('$0,0[.]00')}</p>
                    <div className="date">
                        <DateRangePicker 
                            startDate={moment(range.startDate)}
                            endDate={moment(range.endDate)}
                            onDatesChange={datesChanged}
                            focusedInput={range.focused}
                            onFocusChange={focusChanged}
                            showClearDates={false}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                            displayFormat='DD/MM/YYYY'
                        />
                    </div>
                </div>

                <div>
                    <span>INCOME</span>
                    <p>{numeral(qualified().totalIncomes).format('$0,0[.]00')} </p>
                </div>
                <div>
                    <span className="label">EXPENSE</span>
                    <p>{numeral(qualified().totalExpenses).format('$0,0[.]00')} </p>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage;