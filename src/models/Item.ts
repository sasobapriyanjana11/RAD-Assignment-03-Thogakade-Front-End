export class Item{
    ItemID:number
    Name:string
    Quantity:number
    Price:number

    constructor(ItemID: number, Name: string, Quantity: number, Price: number) {
        this.ItemID = ItemID;
        this.Name = Name;
        this.Quantity = Quantity;
        this.Price = Price;
    }
}