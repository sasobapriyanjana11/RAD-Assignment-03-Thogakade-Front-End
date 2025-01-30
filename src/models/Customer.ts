//customer
export class Customer {
    CustomerID:number;
    Name: string;
    Address: string;
    Email: string;

    constructor(CustomerID: number, Name: string, Address: string, Email: string) {
        this.CustomerID = CustomerID;
        this.Name = Name;
        this.Address = Address;
        this.Email = Email;
    }
}