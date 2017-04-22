import { OrderPaper }   from '../models/orderpaper';
export class SelectedOP {
    Id: number;
    Saved: boolean;
    Value: OrderPaper;

    public compare = (orderPaper: OrderPaper): boolean => {
        var value = JSON.stringify(this.Value);
        var comparevalue = JSON.stringify(orderPaper);
        return value.localeCompare(comparevalue) == 0;
    }
}