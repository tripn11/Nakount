// const records = {
//     incomes:[{amount:1000,date:10},{amount:2000,date:100},{amount:500, date:50}],
//     expenses:[{amount:50,date:15},{amount:200,date:50},{amount:500, date:3000}]
// }

// const filter = {
//     startDate:1,
//     endDate:40
// }

const dashboardSorter = (records, filter) => {
    const qualifiedIncomes = records.incomes.filter((item) => item.date >= filter.startDate && item.date <= filter.endDate)
    const qualifiedExpenses = records.expenses.filter((item) => item.date >= filter.startDate && item.date <= filter.endDate)

    const totalIncomes = qualifiedIncomes
        .map(income => Number(income.amount))
        .reduce((total,item)=> total + item, 0);
    const totalExpenses = qualifiedExpenses
        .map(expense => Number(expense.amount))
        .reduce((total,item)=> total + item, 0)

    return {totalIncomes,totalExpenses,total:totalIncomes - totalExpenses}
}

export default dashboardSorter;