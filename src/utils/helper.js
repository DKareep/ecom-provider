const filterUniqueValues = (data, field) => {
 let filtered =  data?.map(item => item[field])
   if(field === 'colors') {
   filtered =  filtered?.flat()
   }
    return ['all',...new Set(filtered)]
}

export {filterUniqueValues}