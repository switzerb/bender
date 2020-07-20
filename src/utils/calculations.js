
// TODO: Figure out how to set limits here for totals on spend and save, can't spend more than you have, but is constantly changing

export const get_total = (savings, spendings) => {
    return get_savings(savings) + get_spendings(spendings)
}

export const get_savings = (savings) => {
    return savings.length > 0 ? savings.reduce( (a,n) => a + n.inflow - n.outflow, 0) : 0
}

export const get_spendings = (spendings) => {
    return spendings.length > 0 ? spendings.reduce( (a,n) => a + n.inflow - n.outflow, 0) : 0
}

export const latest_allowance_record = (spendings) => {
    const allowance = spendings.filter( item => item.description === "Weekly Allowance");
    return allowance.length > 0 ? Math.max.apply(Math, allowance.map(item => item.timestamp.seconds * 1000)) : 0
}