export class User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: number;
    website: number;
    company: Company;

    constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.username = data.username;
    this.email = data.email;
    this.address = new Address(data.address);
    this.phone = data.phone;
    this.website = data.website;
    this.company = new Company(data.company);
    }
  }
  
  class Address {
    street: string;
    suite: string;
    city: string;
    zipcode: number;
    geo: Geo;
  
    constructor(data: any) {
      this.street = data.street;
      this.suite = data.suite;
      this.city = data.city;
      this.zipcode = data.zipcode;
      this.geo = new Geo(data.geo);
    }
  }
  
  class Geo {
    lat: number;
    lng: number;
  
    constructor(data: any) {
      this.lat = data.lat;
      this.lng = data.lng;
    }
  }
  
  class Company {
    name: string;
    catchPhrase: string;
    bs: string;
  
    constructor(data: any) {
      this.name = data.name;
      this.catchPhrase = data.catchPhrase;
      this.bs = data.bs;
    }
  }
  
