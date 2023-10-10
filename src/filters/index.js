import accounting from "accounting";

export function currency(value) {
        if (value >= 0) return accounting.formatMoney(value)  + " USD";
        else if (!!value) return accounting.formatMoney(Math.abs(value))  + " USD";
        else return accounting.formatMoney(0, "- $ ");
}