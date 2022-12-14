const arrange = (records, filters) => {
    switch (filters.sortBy) {
        case "oldToNew":
            return records.sort((a,b) => a.date - b.date);
        
        case "newToOld":
            return records.sort((a,b) => b.date - a.date);

        case "ascending":
            return records.sort((a,b)=> a.amount - b.amount);

        case "descending":
            return records.sort((a,b)=> b.amount - a.amount)
        default:
            break;
    }
}


const sorter = (records, filters)=> {
    if(filters.searchedWord!==""){
        const qualified = records.filter((item)=>item.description.search(filters.searchedWord) > -1)
        if(qualified.length > 1){
            return arrange(qualified, filters)
        }else{
            return qualified
        }
    }else{
        return arrange(records,filters)
    }
}

export default sorter



    

